import { Request } from 'express';
import { jwtVerify, SignJWT } from 'jose';
import { randomUUID } from 'crypto';
import { HttpError } from './error';
import Wishlists from '../models/wishlists';

interface WishlistJwtPayload {
  jti: string;
  iat: number;
  session_id?: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const getSessionId = async (token: string) => {
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET_KEY)
  );
  if (!verified?.payload) throw new HttpError('Invalid session token', 401);

  const session = verified.payload as WishlistJwtPayload;
  if (!session.session_id) throw new HttpError('Invalid session token', 401);

  return session.session_id;
};

const verifyWishlistOwner = async (wishlistId: string, sessionId: string) => {
  // Check to see if wishlist exists for this session
  const wishlist = await Wishlists.findOne({ sessionId });
  if (!wishlist) throw new HttpError('No wishlist found for this session', 404);

  if (wishlistId !== wishlist._id.toString())
    throw new HttpError('Invalid wishlist session', 403);
};

export const verifySession = async (request: Request) => {
  // Confirm Authorization header is present
  const { authorization } = request.headers;
  if (!authorization?.startsWith('Bearer '))
    throw new HttpError('Missing Authorization Header', 401);

  // Confirm session token is present
  const sessionToken = authorization.slice(7);
  if (!sessionToken) throw new HttpError('Missing session token', 401);

  const sessionId = await getSessionId(sessionToken);

  await verifyWishlistOwner(request.params.id, sessionId);
};

export const generateSessionToken = async (session_id: string) =>
  new SignJWT({
    session_id,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(randomUUID())
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
