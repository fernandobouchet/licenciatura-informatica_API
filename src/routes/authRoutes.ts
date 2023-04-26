import express from 'express';
import { loginCallback, logout } from '../controllers';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  loginCallback
);

router.get('/logout', logout);

export { router as authRoutes };
