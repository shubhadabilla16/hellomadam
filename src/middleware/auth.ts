import type { Request, Response, NextFunction } from 'express';
import { verifyFirebaseToken } from '../lib/firebase-admin';

export interface AuthenticatedUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  name?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization Bearer token' });
    return;
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    res.status(401).json({ error: 'Empty Bearer token' });
    return;
  }

  try {
    const decoded = await verifyFirebaseToken(token);
    if (!decoded.email || decoded.email_verified !== true) {
      res.status(403).json({ error: 'Verified email required' });
      return;
    }

    req.user = {
      uid: decoded.uid,
      email: decoded.email.toLowerCase(),
      emailVerified: Boolean(decoded.email_verified),
      name: typeof decoded.name === 'string' ? decoded.name : undefined,
    };
    next();
  } catch (err) {
    res.status(401).json({
      error: 'Invalid or expired authentication token',
      details: err instanceof Error ? err.message : 'Token verification failed',
    });
  }
}
