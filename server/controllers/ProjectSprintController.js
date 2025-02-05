import ProjectSprintService from "../services/ProjectSprintService.js";
import UpdateActivities from "../Utility/UpdateActivities.js";

class ProjectSprintController {
  async getProjectSprintsController(req, res) {
    const { projectId } = req.params;
    try {
      let sprints = await ProjectSprintService.getProjectSprintInfo({
        projectId,
      });

      if (sprints) {
        return res
          .status(sprints.status)
          .json({ message: sprints.message, sprints: sprints?.sprintInfo });
      } else {
        return res.status(200).json({ message: "Sprint not found" });
      }
    } catch (error) {
      return res.json({ message });
    }
  }

  // create new Project Service
  async createNewSubTaskTaskController(req, res) {
    try {
      let authorId = req.userId;
      let { projectId, TaskId } = req.params;
      let { title } = req.body;

      let newSubTask = await ProjectSprintService.createNewSubTaskTaskService({
        authorId,
        title,
        TaskId,
        projectId,
      });

      if (newSubTask.status === 200) {
        // creating the activity
        await UpdateActivities({
          name: authorId,
          action: "Created",
          task: `new SubTask  ${title}`,
          createdTaskId: projectId,
        });

        return res.status(newSubTask?.status).json({
          message: newSubTask.message,
          subTaskId: newSubTask.subTaskId,
        });
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  }

  // get completed sprint and project info
  async getProjectInfoController(req, res) {
    try {
      let { projectId } = req.params;
      let project = await ProjectSprintService.getProjectAndCompletedSprintInfo(
        { projectId }
      );
      if (project) {
        return res.status(project.status).json({
          message: project.message,
          projectInfo: project.projectInfo,
          sprint: project.sprintInfo,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // update the subtask

  async updateSubTask(req, res) {
    try {
      let { Taskstatus, title } = req.body;

      if (!Taskstatus || !title) {
        return res.status(404).json({ message: "provide all information" });
      }
      let { subTaskId, projectId } = req.params;
      let authorId = req.userId;
      let updatedSubtask = await ProjectSprintService.updateSubtaskService({
        subTaskId,
        Taskstatus,
      });

      if (updatedSubtask.status === 200) {
        // now updating the activity

        // creating the activity
        await UpdateActivities({
          name: authorId,
          action: "Updated",
          task: ` SubTask  ${title} to ${Taskstatus?.toLocaleUpperCase()}`,
          createdTaskId: projectId,
        });
        return res
          .status(updatedSubtask?.status)
          .json({ message: updatedSubtask?.message });
      } else {
        return res
          .status(updatedSubtask?.status)
          .json({ message: updatedSubtask?.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // complete project controller

  async completeProjectController(req, res) {
    let { projectId, sprintId } = req.params;
    try {
      let CompleteSprint = await ProjectSprintService.CompleteSprintService({
        projectId,
        sprintId,
      });

      if (CompleteSprint) {
        return res.status(CompleteSprint.status).json({
          message: CompleteSprint.message,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new ProjectSprintController();
