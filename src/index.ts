import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { configurePassport } from './auth/passport';
import MongoStore from 'connect-mongo';
import { connectDB } from './database';
import { authRoutes, careerRoutes, courseRoutes, periodRoutes } from './routes';

const app = express();
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? `${process.env.CLIENT_URL}`
        : `${process.env.DEV_CLIENT_URL}`,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      crypto: {
        secret: `${process.env.MONGOSTORE_SECRET}`,
      },
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

connectDB();

const port = process.env.PORT || 3001;

app.use('/api/auth', authRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/period', periodRoutes);
app.use('/api/course', courseRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
