import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as appValidator from './appValidator';
import * as categoryValidator from './categoryValidator';
import * as userValidator from './userValidator';

export function validateBody(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const details = err.errors.map(e => ({ message: e.message, path: e.path }));
        res.status(400).json({ error: 'ValidationError', details });
        return;
      }
      next(err);
    }
  };
}

export const schemas = {
  ...appValidator,
  ...categoryValidator,
  ...userValidator
};

