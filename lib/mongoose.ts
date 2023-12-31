import mongoose from "mongoose";

let isconnected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("Missing Mongo db connection strng");
  }
  if (isconnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isconnected = true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default connectDb;
