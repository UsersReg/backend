import mongoose from "mongoose";

export const connectToMongoDb = async () => {
  await mongoose.connect(process.env.DATABASE_URL as string);
};
