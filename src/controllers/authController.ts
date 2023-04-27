import { Request, Response, NextFunction } from 'express';

const loginCallback = (_req: Request, res: Response) => {
  res.redirect(`${process.env.CLIENT_URL}`);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
};

const getUserInfo = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const userInfo = req.user;
    res.send(userInfo);
  } else {
    res.send(null);
  }
};

export { loginCallback, logout, getUserInfo };
