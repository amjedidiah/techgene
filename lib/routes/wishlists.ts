import { Router } from 'express';
import createWishlist from '../controllers/wishlists/create-wishlist';
import getWishlist from '../controllers/wishlists/get-wishlist';
import deleteWishlist from '../controllers/wishlists/delete-wishlist';
import toggleWishlistPrivacy from '../controllers/wishlists/update-wishlist-shareable';

const router = Router();

router.post('/', createWishlist);
router.get('/:id', getWishlist);
router.delete('/:id', deleteWishlist);
router.patch('/:id/shareable', toggleWishlistPrivacy);

export default router;
