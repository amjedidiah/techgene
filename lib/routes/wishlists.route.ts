import { Router } from 'express';
import wishlistCreate from '../controllers/wishlists/wishlist-create';
import wishlistGet from '../controllers/wishlists/wishlist-get';
import wishlistDelete from '../controllers/wishlists/wishlist-delete';
import wishlistTogglePrivacy from '../controllers/wishlists/wishlist-toggle-privacy';
import wishlistAddItem from '../controllers/wishlists/wishlist-add-item';
import { validateWishlistId } from '../validations/wishlists.validator';
import {
  validateBodyProductId,
  validateParamProductId,
} from '../validations/products.validator';
import wishlistRemoveItem from '../controllers/wishlists/wishlist-remove-item';

const router = Router();

router.post('/', wishlistCreate);
router.delete('/:id', validateWishlistId, wishlistDelete);
router.get('/:id', validateWishlistId, wishlistGet);
router.post(
  '/:id/add-item',
  validateWishlistId,
  validateBodyProductId,
  wishlistAddItem
);
router.delete(
  '/:id/remove-item/:productId',
  validateWishlistId,
  validateParamProductId,
  wishlistRemoveItem
);
router.patch('/:id/privacy', validateWishlistId, wishlistTogglePrivacy);

export default router;
