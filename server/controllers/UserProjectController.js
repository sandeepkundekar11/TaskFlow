import ProjectModel from "../model/ProjectModel.js";
import SprintModel from "../model/SprintModel.js";
import TaskModel from "../model/TaskModel.js";
import UserProjectService from "../services/UserProjectService.js";
import UpdateActivities from "../Utility/UpdateActivities.js";

class UserProjectController {
  async createNewTaskController(req, res) {
    try {
      let author = req.userId;
      let { title } = req.body;
      let { projectId } = req.params;
      if (!title || !projectId) {
        return res.status(404).json({ message: "Please provide the Title" });
      }
      // creating new Task
      let newTask = await UserProjectService.createTaskService({
        author,
        title,
        projectId,
      });

      if (newTask) {
        // creating the activity
        await UpdateActivities({
          name: author,
          action: "Created",
          task: title,
          createdTaskId: projectId,
        });
        return res
          .status(newTask.status)
          .json({ message: newTask.message, TaskId: newTask.taskId });
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  }

  //   update Task Controller

  async updateTaskController(req, res) {
    try {
      const { title } = req.body;
      const { updateId, projectId } = req.params;
      const author = req.userId;
      // { title, subTask }, updateId
      if (!title || !updateId) {
        return res.status(404).json({ message: "request body can't be empty" });
      }
      //   update Task
      let updateTask = await UserProjectService.updateTaskService(
        {
          title,
        },
        updateId
      );

      if (updateTask) {
        // creating the activity
        await UpdateActivities({
          name: author,
          action: "Updated",
          task: title,
          createdTaskId: projectId,
        });
        return res
          .status(updateTask.status)
          .json({ message: updateTask.message });
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  }

  //   detele Task
  async deleteTaskcontroller(req, res) {
    let { taskId, projectId } = req.params;
    const author = req.userId;
    try {
      if (!taskId || !projectId) {
        return res.status(404).json({ message: "Provide all information" });
      }

      //   first check project available or not
      let projectExist = await ProjectModel.findOne({ _id: projectId });
      if (!projectExist) {
        return res.status(404).json({ message: "project not found" });
      }
      //   first remove the Task id from the project
      let updatedproject = await ProjectModel.updateOne(
        { _id: projectId },
        {
          $pull: {
            tasks: taskId,
          },
        }
      );

      if (!updatedproject) {
        return res
          .status(403)
          .json({ message: "Task is not removed from the Project" });
      }
      //  now deleting the Task
      let DeletedTasktitle = await TaskModel.findOne({ _id: taskId });
      let deleteTask = await TaskModel.deleteOne({ _id: taskId });

      //
      if (deleteTask) {
        // creating the activity
        await UpdateActivities({
          name: author,
          action: "Deleted",
          task: DeletedTasktitle.title,
          createdTaskId: projectId,
        });
        return res
          .status(200)
          .json({ message: "Task has deleted successfully" });
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  }

  // creating new Sprint
  async createNewSprint(req, res) {
    const { name } = req.body;
    let { projectId } = req.params;
    let author = req.userId;
    try {
      if (!name) {
        return res.status(404).json({ message: "Enter all detals" });
      }

      // check sprint is already running or not if it running then no need to create new sprint
      let activeSprintPresent = await SprintModel.find({
        project: projectId,
        isCompleted: false,
      });

      if (activeSprintPresent.length > 0) {
        return res.status(409).json({ message: "sprint is already running" });
      }
      let newSprint = await UserProjectService.createNewSprint({
        name,
        projectId,
      });

      if (newSprint) {
        // creating the activity
        await UpdateActivities({
          name: author,
          action: "Created",
          task: `new Spint ${name}`,
          createdTaskId: projectId,
        });
        return res
          .status(newSprint.status)
          .json({ message: newSprint.message, sprintId: newSprint.sprintId });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // update Sprint

  async updateSprint(req, res) {
    const { startDate, endDate, Tasks = [] } = req.body;
    const author = req.userId;
    const { projectId, sprintId } = req.params;
    if (!startDate && !endDate && !Tasks && Tasks.length === 0) {
      return res.status(404).json({ message: "Provide all information" });
    }
    try {
      // { startDate, endDate, Tasks, sprintId }
      let updateSprint = await UserProjectService.updateSprintService({
        startDate,
        endDate,
        Tasks,
        sprintId,
      });

      // getting the sprint
      let sprint = await SprintModel.findOne({ _id: sprintId }, "name");
      if (updateSprint) {
        // creating the activity
        await UpdateActivities({
          name: author,
          action: "Updated",
          task: `new Spint ${sprint?.name}`,
          createdTaskId: projectId,
        });

        return res
          .status(updateSprint?.status)
          .json({ message: updateSprint.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // remove Task from the Sprint

  async removeTaskFromSprint(req, res) {
    const { Tasks } = req.body;
    const { sprintId } = req.params;
    if (!sprintId || !Tasks) {
      return res.status(404).json({ message: "Provide all information" });
    }
    try {
      let removeTask = await UserProjectService.deleteTaskFromSprintService({
        Tasks,
        sprintId,
      });

      if (removeTask) {
        return res
          .status(removeTask.status)
          .json({ message: removeTask.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // get project backlogs
  async getProjectBacklogs(req, res) {
    let { projectId } = req.params;
    let { isCompleted, isStarted } = req.query;
    try {
      let projectBacklogs = await UserProjectService.getAllBacklogData(
        projectId,
        isStarted,
        isCompleted
      );

      if (projectBacklogs) {
        return res.status(projectBacklogs.status).json({
          message: projectBacklogs.message,
          backlogs: projectBacklogs.backlogs,
          sprint: projectBacklogs.sprint,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
export default new UserProjectController();
