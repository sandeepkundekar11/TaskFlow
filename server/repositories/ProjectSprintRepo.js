import ProjectModel from "../model/ProjectModel.js";
import SprintModel from "../model/SprintModel.js";
import SubTaskModel from "../model/SubTasksModel.js";
import TaskModel from "../model/TaskModel.js";

class ProjectSprintRepo {
  async getSprintInfo({ projectId }) {
    try {
      return await SprintModel.findOne({
        $and: [
          { project: projectId },
          { isCompleted: false },
          { isStarted: true },
        ],
      })
        .populate({
          path: "project",
          model: "project",
          select: "name description",
        })
        .populate({
          path: "Tasks",
          model: "task",
          select: "title author subTasks taskCode",
          //   populating the author
          populate: [
            {
              path: "author",
              model: "user",
              select: "name _id ", // Add `select` for author if needed
            },
            {
              path: "subTasks",
              model: "subtask",
              populate: {
                path: "author",
                model: "user",
                select: "name _id",
              },
            },
          ],
        });
    } catch (error) {
      console.log("erorr while getting sprints info");
    }
  }

  // create a subtask
  async createNewSubTask({ authorId, title, TaskId, projectId }) {
    try {
      // creating subTask
      let newTask = await SubTaskModel.create({
        author: authorId,
        title: title,
        status: "todo",
      });

      // after updating the parent Task
      let TaskUpdated = await TaskModel.updateOne(
        { _id: TaskId },
        {
          $addToSet: {
            subTasks: newTask._id,
          },
        }
      );

      return newTask;
    } catch (error) {
      console.log("error while  creating the subTask");
    }
  }

  // get Available sprints of project
  async getAvailableProjectSprint({ projectId }) {
    try {
      return await SprintModel.find({ project: projectId, isStarted: true, isCompleted: true }, "name startDate endDate")
    } catch (error) {
      console.log("error while get all sprints");
    }
  }

  // get projectInfo 
  async getProjectInfo({ projectId }) {
    try {
      return await ProjectModel.findOne({ _id: projectId }, "name description users").populate({
        path: "users",
        model: "user",
        select: "name"
      })
    } catch (error) {
      console.log("error while get  project info");
    }
  }


  //update subTask
  async updateSubTask({ subTaskId, Taskstatus }) {
    try {
      return await SubTaskModel.updateOne({ _id: subTaskId }, {
        $set: {
          status: Taskstatus
        }
      })
    } catch (error) {
      console.log("error updating the subTask");
    }
  }
}
export default new ProjectSprintRepo();
