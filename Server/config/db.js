import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "swe_lab_project",
    })
    .then(() => {
      console.log("Connected to MongoDB Databse");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
