import { Request, Response, NextFunction } from 'express';

const loginCallback = (_req: Request, res: Response) => {
  res.redirect('/api/auth');
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
};

export { loginCallback, logout };
