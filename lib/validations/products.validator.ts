import { body, param } from 'express-validator';
import Products from '../models/products.model';

const nameValidator = () =>
  body('name', 'Please enter a product name between 2 and 50 characters long')
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 });

const priceValidator = () =>
  body('price', 'Please enter a price greater than 0').isInt({ gt: 0 });

const productExistsValidator = () =>
  body('name').custom((name) =>
    Products.findOne({
      name,
    }).then((product) => {
      if (product) return Promise.reject('Product has already been added');
      return true;
    })
  );

// Implementing very little validation to allow for product addition
export const addProductValidation = [
  nameValidator(),
  priceValidator(),
  productExistsValidator(),
];

export const validateBodyProductId = body('productId', 'Invalid product id')
  .isString()
  .custom((value) => value.match(/^[0-9a-fA-F]{24}$/))
  .custom((id) =>
    Products.findById(id).then((product) => {
      if (!product || product.isDeleted)
        return Promise.reject(`A product with id: ${id} was not found`);
      return true;
    })
  );

export const validateParamProductId = param('productId', 'Invalid product id')
  .trim()
  .custom((value) => value.match(/^[0-9a-fA-F]{24}$/))
  .custom((id) =>
    Products.findById(id).then((product) => {
      if (!product || product.isDeleted)
        return Promise.reject(`A product with id: ${id} was not found`);
      return true;
    })
  );
