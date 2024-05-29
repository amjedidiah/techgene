import { param } from 'express-validator';

export const validateWishlistId = param('id', 'Invalid wishlist id')
  .trim()
  .custom((value) => value.match(/^[0-9a-fA-F]{24}$/));
