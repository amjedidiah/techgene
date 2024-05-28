import { Request, Response } from 'express';
import { handleResponseError } from '../../config/error';
import { verifySession } from '../../config/auth';
import Wishlists from '../../models/wishlists';

export default async function toggleWishlistPrivacy(
  req: Request,
  res: Response
) {
  try {
    // Verify wishlist session
    await verifySession(req);

    const newShareableValue = !!req.body.isShareable;

    const wishlist = await Wishlists.findByIdAndUpdate(req.params.id, {
      isShareable: newShareableValue,
    }).select('-sessionId');

    res.json({
      data: {
        wishlist,
      },
      message: `Wishlist made ${
        newShareableValue ? 'public' : 'private'
      } successfully`,
    });
  } catch (error) {
    handleResponseError(res, error);
  }
}
