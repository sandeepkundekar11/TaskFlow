import express from "express";
import userAuth from "../middlerwares/userAuth.js";
import userController from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/loginUser", userController.LoginUser);
// this route gets the all users projects available
UserRouter.get("/projects", userAuth, userController.getUserProjects);

export default UserRouter;
