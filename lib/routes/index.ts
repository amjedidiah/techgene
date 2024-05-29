import { Router } from 'express';
import wishlistsRoute from './wishlists.route';
import productsRoute from './products.route';

const router = Router();

router.get('/', (req, res) => res.send({ message: 'Hello API' }));

// CSRF Protection route
router.get(process.env.CSRF_ROUTE as string, (req, res) =>
  res.send({
    data: { csrfToken: req.csrfToken() },
    message: 'CSRF Token fetched successfully',
  })
);

router.use('/products', productsRoute);
router.use('/wishlists', wishlistsRoute);


export default router;
