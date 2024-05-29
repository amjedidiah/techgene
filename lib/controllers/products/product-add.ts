import { NextFunction, Request, Response } from 'express';
import { handleValidationErrors } from '../../config/error';
import Products from '../../models/products.model';

export default async function productAdd(
  req: Request<{}, {}, { name: string; price: number; image?: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    handleValidationErrors(req);

    const { name, price, image } = req.body;

    const newProduct = new Products({
      name,
      price,
      image,
    });
    const savedProduct = await newProduct.save();

    res.status(201).json({
      data: {
        product: savedProduct,
      },
      message: 'Product created successfully',
    });
  } catch (error) {
    next(error);
  }
}
