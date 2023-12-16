import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    throw new Error('=> No database URL provided.');
  }

  if (isConnected) {
    return console.log('=> using existing database connection');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'DoubtSync',
    });

    isConnected = true;

    console.log('=> using new database connection');
  } catch (error) {
    console.error('MongoDB Connection Failed', error);
  }
};
