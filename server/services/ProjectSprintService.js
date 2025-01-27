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
        };
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
