import { NextFunction, Request, Response } from 'express';
import { handleValidationErrors } from '../../config/error';
import Products from '../../models/products.model';

export default async function productDelete(
  req: Request<{ productId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);
    const { productId } = req.params;

    const deletedProduct = await Products.findByIdAndUpdate(
      productId,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    res.json({
      data: {
        product: deletedProduct,
      },
      message: 'Product scheduled for deletion successfully',
    });
  } catch (error) {
    next(error);
  }
}
