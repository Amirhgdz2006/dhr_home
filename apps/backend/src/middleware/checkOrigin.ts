import { Request, Response, NextFunction } from 'express';

const allowedOrigins: string[] = process.env.FRONTEND_URLS?.split(',') || (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []);

export default function checkOrigin(req: Request, res: Response, next: NextFunction): void {
  const origin = req.get('origin') || req.get('referer') || '';

  const originHost = origin.split('/').slice(0, 3).join('/');
  
  if (!originHost) {
    res.status(403).json({ error: 'Forbidden: missing origin' });
    return;
  }
  
  if (!allowedOrigins.includes(originHost)) {
    res.status(403).json({ error: 'Forbidden: origin not allowed' });
    return;
  }
  
  next();
}

