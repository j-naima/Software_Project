import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "swe_lab_project",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log("Database connection failed.", err);
    });
};
