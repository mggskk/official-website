import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectDB = async (url) => {
  const connected = await mongoose.connect(url);
  if (connected) {
    console.log('Connected to DB successfully');
    return connected;
  }
  console.log('Some error occured while connecting to DB');
};
