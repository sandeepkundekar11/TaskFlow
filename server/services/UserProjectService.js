import ProjectModel from "../model/ProjectModel.js";
import SprintModel from "../model/SprintModel.js";
import TaskModel from "../model/TaskModel.js";
import UserProjectRepo from "../repositories/UserProjectRepo.js";
import { isValidProjectDuration } from "../Utility/ProjectValidation.js";

class UserProjectService {
  async createTaskService(info) {
    const { author, title, projectId } = info;
    try {
      // creating the new Task
      let newTask = await UserProjectRepo.createTask(
        { author, title },
        projectId
      );
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
        return {
          status: 200,
          message: "newTask has created",
          taskId: newTask._id,
        };
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
          sprintId: createNewSprint.sprintId,
        };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // updating the sprint
  async updateSprintService({
    startDate,
    endDate,
    Tasks,
    sprintId,
    isStartSprint = false,
  }) {
    try {
      if (startDate && endDate) {
        let validDuration = isValidProjectDuration(startDate, endDate, 6);
        if (!validDuration) {
          return {
            status: 400,
            message: "sprint duration should be Allist 6 days",
          };
        }
      }

      //  if  isStartSprint is true then we are starting the sprint
      if (isStartSprint) {
        // first we will check that sprint should have atlist 4 tasks

        let sprintTasks = await SprintModel.findOne(
          { _id: sprintId },
          "Tasks startDate endDate"
        );
        if (sprintTasks.Tasks.length < 4) {
          return { status: 400, message: "Sprint should have Atlist 4 Tasks" };
        } else if (!sprintTasks.startDate || !sprintTasks.endDate) {
          return { status: 400, message: "Sprint Duration has not updated" };
        }
        let startSprint = await UserProjectRepo.StartSprintRepo(sprintId);
        if (startSprint) {
          return { status: 200, message: "sprint has started" };
        }
      }
      //else updating the sprint
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

  // deleet the Task from the sprint

  async deleteTaskFromSprintService({ Task, sprintId }) {
    try {
      let deleteTask = await UserProjectRepo.removeTaskFromSprint({
        Task,
        sprintId,
      });
      if (deleteTask) {
        return { status: 200, message: "Task has Removed Successfully" };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // get all project backlog data
  async getAllBacklogData(projectId, isStarted = false, isCompleted = false) {
    try {
      // checks that is project available or not
      let projectExist = await ProjectModel.findOne({ _id: projectId });
      if (!projectExist) {
        return { status: 404, message: "project not found" };
      }
      // getting the project info
      let projectInfo = await UserProjectRepo.getProjectBacklogs(projectId);
      let sprint = await UserProjectRepo.getSprint(
        projectId,
        isStarted,
        isCompleted
      );
      if (projectInfo && sprint) {
        return {
          status: 200,
          backlogs: projectInfo,
          sprint: sprint,
        };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
export default new UserProjectService();
