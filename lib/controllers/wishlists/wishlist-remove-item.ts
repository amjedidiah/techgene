import { NextFunction, Request, Response } from 'express';
import { verifySession } from '../../config/auth';
import { HttpError, handleValidationErrors } from '../../config/error';
import Wishlists from '../../models/wishlists.model';

export default async function wishlistRemoveItem(
  req: Request<{ id: string; productId: string }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);

    // Verify wishlist session
    await verifySession(req);

    const { productId } = req.params;

    const updatedWishlist = await Wishlists.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { items: { product: productId } },
      },
      { new: true }
    );

    if (!updatedWishlist) throw new HttpError('Wishlist not found', 404);

    res.json({
      data: { wishlist: { items: updatedWishlist.items } },
      message: 'Product removed from wishlist successfully',
    });
  } catch (error) {
    next(error);
  }
}
