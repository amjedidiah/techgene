import { Router } from 'express';
import productAdd from '../controllers/products/product-add';
import {
  addProductValidation,
  validateParamProductId,
} from '../validations/products.validator';
import productDelete from '../controllers/products/product-delete';
import { productToggleAvailability } from '../controllers/products/product-toggle-availability';

const router = Router();

router.post('/', addProductValidation, productAdd);
router.delete('/:productId', validateParamProductId, productDelete);
router.patch(
  '/:productId/availability',
  validateParamProductId,
  productToggleAvailability
);

export default router;
