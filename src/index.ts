import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './database';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
