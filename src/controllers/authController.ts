import { Request, Response, NextFunction } from 'express';

const loginCallback = (_req: Request, res: Response) => {
  res.redirect(
    process.env.NODE_ENV === 'production'
      ? `${process.env.CLIENT_URL}`
      : `${process.env.DEV_CLIENT_URL}`
  );
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    if (req.session) {
      req.session.destroy((error) => {
        if (error) return next(error);
      });
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

const getUserInfo = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const userInfo = req.user;
    res.send(userInfo);
  } else {
    res.send(null);
  }
};

export { loginCallback, logout, getUserInfo };
