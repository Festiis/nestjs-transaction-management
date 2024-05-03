import { Request, Response, NextFunction } from 'express';

export const contentTypeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method !== 'GET' && !req.is('application/json')) {
    return res
      .status(415)
      .json({ description: 'Specified content type not allowed.' });
  }
  next();
};
