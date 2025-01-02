import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRouter from "./Routes/adminRoutes.js";
dotenv.config({ path: "./config.env" });
const app = express();
// connecting the mongoose database

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());
// admin routes
app.use("/admin", adminRouter); // this handles all admin related routes
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
