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

      return TaskUpdated;
    } catch (error) {
      console.log("erorr while  creating the subTask");
    }
  }
}
export default new ProjectSprintRepo();
