import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { generateSessionToken } from '../../config/auth';
import Wishlists from '../../models/wishlists.model';
import logger from '../../config/logger';

export default async function wishlistCreate(
  _req: Request,
  res: Response,
  next: NextFunction
) {
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
    res.status(201).json({
      data: {
        wishlistId: createdWishlist._id,
        token,
      },
      message: 'Wishlist created successfully',
    });
  } catch (error) {
    next(error);
  }
}
