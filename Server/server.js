import { connectDB } from "./config/db.js";
import app from "./app.js";

//----------------- Database Connection -----------------
connectDB();

//----------------- Start Server -----------------
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//----------------- Error Handling -----------------
process.on("unhandledRejection", (error) => {
  console.error(`Unhandled Rejection: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error) => {
  console.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

export default server;


