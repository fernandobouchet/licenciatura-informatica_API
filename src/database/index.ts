import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}`);
};

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error);
});

db.once('connected', () => {
  console.log('Database connected');
});

export { connectDB };
