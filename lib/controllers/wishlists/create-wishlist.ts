import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { handleResponseError } from '../../config/error';
import { generateSessionToken } from '../../config/auth';
import Wishlists from '../../models/wishlists';
import logger from '../../config/logger';

export default async function createWishlist(_req: Request, res: Response) {
  try {
    // Generate a session token for this guest user
    const sessionId = randomUUID();
    const token = await generateSessionToken(sessionId);

    // Create a new wishlist for this guest user
    const newWishlist = new Wishlists({
      sessionId,
    });
    const createdWishlist = await newWishlist.save();

    logger.info(`Wishlist created successfully: ${createdWishlist}`);
    res.json({
      data: {
        wishlistId: createdWishlist._id,
        token,
      },
      message: 'Wishlist created successfully',
    });
  } catch (error) {
    handleResponseError(res, error);
  }
}
