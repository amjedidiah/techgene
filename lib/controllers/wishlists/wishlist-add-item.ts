import { NextFunction, Request, Response } from 'express';
import { verifySession } from '../../config/auth';
import { HttpError, handleValidationErrors } from '../../config/error';
import Wishlists from '../../models/wishlists.model';

export default async function wishlistAddItem(
  req: Request<{ id: string }, {}, { productId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);

    // Verify wishlist session
    await verifySession(req);

    const { productId } = req.body;

    const wishlist = await Wishlists.findById(req.params.id);
    if (!wishlist) throw new HttpError('Wishlist not found', 404);

    const isProductInWishlist = wishlist.items.some(
      (item) => item.product._id.toString() === productId
    );
    if (isProductInWishlist)
      throw new HttpError(
        `Product ${productId} is already in the wishlist`,
        400
      );

    const updatedWishlist = await Wishlists.findByIdAndUpdate(
      req.params.id,
      {
        $push: { items: { product: productId } }, // improve to `addToSet` to naturally avoid duplicates
      },
      { new: true, runValidators: true }
    );

    res.json({
      data: { wishlist: { items: updatedWishlist?.items } },
      message: 'Product added to wishlist successfully',
    });
  } catch (error) {
    next(error);
  }
}
