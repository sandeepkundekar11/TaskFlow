import express from "express";
import adminController from "../controllers/adminController.js";
import AdminProjectController from "../controllers/AdminProjectController.js";
import userAuth from "../middlerwares/userAuth.js";
const adminRouter = express.Router();

adminRouter.post("/adminSignup", adminController.adminSignupController);
adminRouter.post("/adminlogin", adminController.adminLoginController);
adminRouter.post(
  "/addUser",
  userAuth,
  adminController.addUserToCompanyController
);
// creating new project

adminRouter.put("/createProject", userAuth, AdminProjectController.createNewProjectController)
export default adminRouter;
