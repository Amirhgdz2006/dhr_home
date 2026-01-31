import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { secret } from '../config/jwt';

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!secret) {
    res.status(500).json({ error: 'JWT secret not configured' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload & { id: string; username: string };

    if (typeof decoded !== 'object' || !decoded.id || !decoded.username) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    req.user = { id: String(decoded.id), username: String(decoded.username) };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
