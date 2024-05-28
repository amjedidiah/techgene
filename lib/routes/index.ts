import { Router } from 'express';
import wishlistsRoute from './wishlists';

const router = Router();

router.get('/', (req, res) => res.send({ message: 'Hello API' }));
router.get(process.env.CSRF_ROUTE as string, (req, res) =>
  res.send({
    data: { csrfToken: req.csrfToken() },
    message: 'CSRF Token fetched successfully',
  })
);
router.use('/wishlists', wishlistsRoute);

export default router;
