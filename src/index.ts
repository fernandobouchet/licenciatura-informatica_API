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
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
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
