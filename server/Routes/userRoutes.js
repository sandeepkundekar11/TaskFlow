import express from "express";
import userAuth from "../middlerwares/userAuth.js";
import userController from "../controllers/userController.js";
import UserProjectController from "../controllers/UserProjectController.js";

const UserRouter = express.Router();

UserRouter.post("/loginUser", userController.LoginUser);
// this route gets the all users projects available
UserRouter.get("/projects", userAuth, userController.getUserProjects);

// creating the new Tasks
UserRouter.post(
  "/createTask/:projectId",
  userAuth,
  UserProjectController.createNewTaskController
);

// edit Task
UserRouter.put(
  "/updateTask/:projectId/:updateId",
  userAuth,
  UserProjectController.updateTaskController
);

// delete Task

UserRouter.delete(
  "/deleteTask/:projectId/:taskId",
  userAuth,
  UserProjectController.deleteTaskcontroller
);

//  create new Sprint

UserRouter.post(
  "/createSprint/:projectId",
  userAuth,
  UserProjectController.createNewSprint
);

// update the sprint

UserRouter.put(
  "/updateSprint/:projectId/:sprintId",
  userAuth,
  UserProjectController.updateSprint
);

// get project backlogs and sprints

UserRouter.get(
  "/getBacklogs/:projectId",
  userAuth,
  UserProjectController.getProjectBacklogs
);

//  delete the Task from  sprint

UserRouter.delete(
  "/backlogs/:sprintId",
  userAuth,
  UserProjectController.removeTaskFromSprint
);
export default UserRouter;
