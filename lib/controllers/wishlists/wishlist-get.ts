import { NextFunction, Request, Response } from 'express';
import { HttpError, handleValidationErrors } from '../../config/error';
import Wishlists from '../../models/wishlists.model';
import { verifySession } from '../../config/auth';

async function handleWishlistPrivacy(
  req: Request,
  isPrivate: boolean,
  isWishlistOwner: boolean
) {
  try {
    if (isPrivate || isWishlistOwner) await verifySession(req);
  } catch (error) {
    throw new HttpError(
      isWishlistOwner
        ? 'You are not the owner of this wishlist'
        : 'This wishlist is private',
      403
    );
  }
}

export default async function wishlistGet(
  req: Request<{ id: string }, {}, {}, { shared?: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);
    const { id: wishlistId } = req.params;
    const { shared } = req.query;

    // Fetch wishlist
    const wishlist = await Wishlists.findById(wishlistId);
    if (!wishlist)
      throw new HttpError(`Wishlist with id: ${wishlistId} not found`, 404);

    const isWishlistOwner = !shared;

    // Check if wishlist is private or if it's being accessed by the owner
    await handleWishlistPrivacy(req, wishlist.isPrivate, isWishlistOwner);

    res.json({
      data: { wishlist: isWishlistOwner ? wishlist : wishlist.items },
      message: 'Wishlist fetched successfully',
    });
  } catch (error) {
    next(error);
  }
}
