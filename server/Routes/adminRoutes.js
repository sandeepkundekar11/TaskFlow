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
adminRouter.put(
  "/createProject",
  userAuth,
  AdminProjectController.createNewProjectController
);

// update the project
adminRouter.put(
  "/updateProject/:projectId",
  userAuth,
  AdminProjectController.updateProjectController
);

// get all users to add in the project

adminRouter.get(
  "/getuser",
  userAuth,
  AdminProjectController.getAllCompanyUsers
);

// get all users with their Task Counts

adminRouter.get(
  "/getUserWithTaskCount",
  userAuth,
  AdminProjectController.getAllUsersWithTaskCountController
);

// get all Projects of Company
adminRouter.get(
  "/getProjects",
  userAuth,
  AdminProjectController.getAllProjects
);

//get dashboard

adminRouter.get(
  "/dashboard",
  userAuth,
  adminController.getDashboardDataController
);


// new project Info with activities
//  start, end query parameters
adminRouter.get(
  "/viewProject/:projectId",
  userAuth,
  adminController.viewProjectController)
export default adminRouter;
