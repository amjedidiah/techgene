import { NextFunction, Request, Response } from 'express';
import { handleValidationErrors } from '../../config/error';
import { verifySession } from '../../config/auth';
import Wishlists from '../../models/wishlists.model';

export default async function wishlistTogglePrivacy(
  req: Request<{ id: string }, {}, { isPrivate?: boolean }>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);
    const wishlistId = req.params.id;

    // Verify wishlist session
    await verifySession(req);

    const isPrivate = !!req.body.isPrivate;

    const updatedWishlist = await Wishlists.findByIdAndUpdate(
      wishlistId,
      {
        isPrivate,
      },
      {
        new: true,
      }
    );

    res.json({
      data: {
        wishlist: updatedWishlist,
      },
      message: `Wishlist made ${isPrivate ? 'private' : 'public'} successfully`,
    });
  } catch (error) {
    next(error);
  }
}
