import ProjectModel from "../model/ProjectModel.js";
import TaskModel from "../model/TaskModel.js";
import UserProjectRepo from "../repositories/UserProjectRepo.js";

class UserProjectService {
  async createTaskService(info) {
    const { author, title, projectId } = info;
    try {
      // creating the new Task
      let newTask = await UserProjectRepo.createTask({ author, title });
      //   lets update the Project
      let updateProject = await ProjectModel.updateOne(
        { _id: projectId },
        {
          $addToSet: {
            tasks: newTask._id,
          },
        }
      );
      if (newTask && updateProject) {
        return { status: 200, message: "newTask has created" };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // update the Task
  async updateTaskService({ title }, updateId) {
    try {
      // first check the Task is available or not
      let isTaskAvailable = await TaskModel.findOne({ _id: updateId });

      if (!isTaskAvailable) {
        return { status: 404, message: "Task is Not available" };
      }
      //   now update the task

      let updateTask = await UserProjectRepo.updateTask({ title }, updateId);

      if (updateTask) {
        return {
          status: 200,
          message: "Task has updated",
        };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // create new sprint
  async createNewSprint({ name, projectId }) {
    try {
      let createNewSprint = await UserProjectRepo.creatNewSprint({
        name,
        projectId,
      });
      if (createNewSprint) {
        return {
          status: 200,
          message: "create Sprint has created successfully",
        };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // updating the sprint
  async updateSprintService({ startDate, endDate, Tasks, sprintId }) {
    try {
      let updateSprint = await UserProjectRepo.updateSprint({
        startDate,
        endDate,
        Tasks,
        sprintId,
      });

      if (updateSprint) {
        return { status: 200, message: "sprint updated succssfully" };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
export default new UserProjectService();
