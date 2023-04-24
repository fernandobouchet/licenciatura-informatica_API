import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './database';
import { careerRoutes, courseRoutes, periodRoutes } from './routes';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT || 3001;

app.use('/api/career', careerRoutes);
app.use('/api/period', periodRoutes);
app.use('/api/course', courseRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
