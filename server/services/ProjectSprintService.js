import SubTaskModel from "../model/SubTasksModel.js";
import ProjectSprintRepo from "../repositories/ProjectSprintRepo.js";

class ProjectSprintService {
  async getProjectSprintInfo({ projectId }) {
    try {
      let projectSprint = await ProjectSprintRepo.getSprintInfo({ projectId });
      if (projectSprint) {
        return {
          status: 200,
          sprintInfo: projectSprint,
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  // create new Task
  async createNewSubTaskTaskService({ authorId, title, TaskId, projectId }) {
    try {
      // creating newTask
      let newTask = await ProjectSprintRepo.createNewSubTask({
        authorId,
        title,
        TaskId,
        projectId,
      });

      if (newTask) {
        return {
          status: 200,
          message: "Task Has created Successfullt",
          subTaskId: newTask._id
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  // get Project and available completed sprint info

  async getProjectAndCompletedSprintInfo({ projectId }) {
    try {
      let projectInfo = await ProjectSprintRepo.getProjectInfo({ projectId })
      let completedSprintInfo = await ProjectSprintRepo.getAvailableProjectSprint({ projectId })
      if (projectInfo && completedSprintInfo) {
        return {
          status: 200,
          sprintInfo: completedSprintInfo,
          projectInfo: projectInfo
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }


  // update the subTask
  async updateSubtaskService({ subTaskId, Taskstatus }) {
    try {
      // checking that subtask is available or not
      let subTaskExist = await SubTaskModel.findOne({ _id: subTaskId })
      if (!subTaskExist) {
        return { status: 404, message: "subtask not available" }
      }
      // now checking the status validation
      if (Taskstatus?.trim().toLocaleLowerCase() !== "inprogress" && Taskstatus?.trim().toLocaleLowerCase() !== "completed") {
        return {
          status: 400, message: "status type is not valid"
        }
      }

      // checking that the subtask is in different status

      let PrevStatus = subTaskExist.status
      if (PrevStatus === Taskstatus || PrevStatus === "completed") {
        return {
          status: 400,
          message: "can't perform this action"
        }
      }
      let updatedSubTask = await ProjectSprintRepo.updateSubTask({ subTaskId, Taskstatus })


      if (updatedSubTask) {
        return {
          status: 200,
          message: `subTask is updated to ${Taskstatus}`
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}

export default new ProjectSprintService();
