import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import adminRouter from "./Routes/adminRoutes.js";
import UserRouter from "./Routes/userRoutes.js";
import ActivityModel from "./model/ActivityLogModel.js";
import AdministratorModel from "./model/AdministratorModel.js";
import ProjectModel from "./model/ProjectModel.js";
import SprintModel from "./model/SprintModel.js";
import SubTaskModel from "./model/SubTasksModel.js";
import TaskModel from "./model/TaskModel.js";
import UserModel from "./model/UserModel.js";
dotenv.config({ path: "./config.env" });
const app = express();
// connecting the mongoose database
await UserModel()
await TaskModel()
await SubTaskModel()
await SprintModel()
await ProjectModel()
await AdministratorModel()
await ActivityModel()
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

// user routes
app.use("/user", UserRouter); // this handles all user related routes
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
