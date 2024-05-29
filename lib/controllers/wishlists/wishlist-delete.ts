import { NextFunction, Request, Response } from 'express';
import { handleValidationErrors } from '../../config/error';
import { verifySession } from '../../config/auth';
import Wishlists from '../../models/wishlists.model';

export default async function wishlistDelete(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);
    const wishlistId = req.params.id;

    // Verify wishlist session
    await verifySession(req);

    const deletedWishlist = await Wishlists.findByIdAndDelete(wishlistId);

    res.json({
      data: {
        wishlist: deletedWishlist,
      },
      message: 'Wishlist deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
