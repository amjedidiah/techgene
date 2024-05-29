import { NextFunction, Request, Response } from 'express';
import { handleValidationErrors } from '../../config/error';
import Products from '../../models/products.model';

export async function productToggleAvailability(
  req: Request<{ productId: string }, {}, { inStock?: boolean }>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);

    const { productId } = req.params;
    const inStock = !!req.body.inStock;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      {
        inStock,
      },
      {
        new: true,
      }
    );

    res.json({
      data: {
        product: updatedProduct,
      },
      message: `Product has been set as ${
        inStock ? 'available' : 'unavailable'
      }`,
    });
  } catch (error) {
    next(error);
  }
}
