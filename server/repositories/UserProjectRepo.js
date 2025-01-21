import SprintModel from "../model/SprintModel.js";
import TaskModel from "../model/TaskModel.js";

class UserProjectRepo {
  async createTask(TaskInfo) {
    const { author, title } = TaskInfo;
    try {
      return await TaskModel.create({ author: author, title: title });
    } catch (error) {
      console.log("error occured while creating the new task");
    }
  }

  async updateTask(dataToUpdate, updateId) {
    // const { updateId, title, subTasks } = updateInfo;

    let Obj = {};
    if (dataToUpdate.title) {
      Obj.title = dataToUpdate.title;
    }
    try {
      // upadting the Title
      if (Obj.title) {
        return await TaskModel.updateOne(
          { _id: updateId },
          {
            $set: {
              title: Obj.title,
            },
          }
        );
      }
    } catch (error) {
      console.log("error occured while updating the Tasks");
    }
  }

  //  create new Sprint
  async creatNewSprint(info) {
    const { name, projectId } = info;
    try {
      return await SprintModel.create({
        name: name,
        project: projectId,
      });
    } catch (error) {
      console.log("error  while creating new Sprint", error.message);
    }
  }

  // update the sprint

  async updateSprint(info) {
    const { startDate, endDate, Tasks, sprintId } = info;

    let Obj = {};
    if (startDate) Obj.startDate = startDate;
    if (endDate) Obj.endDate = endDate;
    if (Tasks) Obj.Tasks = Tasks;
    try {
      return await SprintModel.updateOne(
        { _id: sprintId },
        {
          $set: Obj,
        }
      );
    } catch (error) {
      console.log("error  while Upading Sprint");
    }
  }
}

export default new UserProjectRepo();
