import { Request, Response } from 'express';
import { handleResponseError } from '../../config/error';
import { verifySession } from '../../config/auth';
import Wishlists from '../../models/wishlists';

export default async function deleteWishlist(req: Request, res: Response) {
  try {
    // Verify wishlist session
    await verifySession(req);

    const wishlist = await Wishlists.findByIdAndDelete(req.params.id).select(
      '-sessionId'
    );

    res.json({
      data: {
        wishlist,
      },
      message: 'Wishlist deleted successfully',
    });
  } catch (error) {
    handleResponseError(res, error);
  }
}
