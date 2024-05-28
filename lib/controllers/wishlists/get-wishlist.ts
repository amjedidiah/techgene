import { Request, Response } from 'express';
import { HttpError, handleResponseError } from '../../config/error';
import Wishlists from '../../models/wishlists';
import { verifySession } from '../../config/auth';

async function handleIsShareable(req: Request, isShareable: boolean) {
  try {
    if (!isShareable) await verifySession(req);
  } catch (error) {
    throw new HttpError('This wishlist is private', 403);
  }
}

function validateWishlistId(wishlistId: string) {
  if (!wishlistId.match(/^[0-9a-fA-F]{24}$/))
    throw new HttpError('Invalid wishlist id', 400);

  return wishlistId;
}

export default async function getWishlist(req: Request, res: Response) {
  try {
    validateWishlistId(req.params.id);

    // Fetch wishlist
    const wishlist = await Wishlists.findById(req.params.id);
    if (!wishlist)
      throw new HttpError(`Wishlist with id: ${req.params.id} not found`, 404);

    // Check if wishlist is shareable
    await handleIsShareable(req, wishlist.isShareable);

    res.json({
      data: { wishlistItems: wishlist.items },
      message: 'Wishlist items fetched successfully',
    });
  } catch (error) {
    handleResponseError(res, error);
  }
}
