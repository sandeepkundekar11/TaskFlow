import ProjectModel from "../model/ProjectModel.js";
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
      if (Obj.startDate || Obj.endDate) {
        return await SprintModel.updateOne(
          { _id: sprintId },
          {
            $set: Obj,
          }
        );
      }
      if (Obj.Tasks) {
        // Update task statuses in parallel
        await Promise.all(
          Obj.Tasks.map(async (id) => {
            await TaskModel.updateOne({ _id: id }, { IsInSprint: true });
          })
        );

        // Push tasks to the sprint, ensuring uniqueness
        let SprintAupdate = await SprintModel.updateMany(
          { _id: sprintId },
          {
            $addToSet: {
              Tasks: { $each: Obj.Tasks },
            },
          }
        );
        return SprintAupdate;
      }
    } catch (error) {
      console.log("error  while Upading Sprint");
    }
  }

  // get project backlogs info
  async getProjectBacklogs(projectId) {
    try {
      return await ProjectModel.findOne(
        { _id: projectId },
        "name description tasks"
      ).populate({
        path: "tasks",
        model: "task",
        select: "title author IsInSprint",
        match: { IsInSprint: false },
      });
    } catch (error) {
      console.log("error while getting the project backlogs");
    }
  }

  //get all avaialble  project sprint
  async getSprint(projectId, isStarted = false, isCompleted = false) {
    try {
      return await SprintModel.find({
        $and: [
          { project: projectId },
          { isStarted: isStarted },
          { isCompleted: isCompleted },
        ],
      }).populate({
        path: "Tasks",
        model: "task",
        select: "title author IsInSprint",
      });
    } catch (error) {
      console.log("error while getting the project backlogs");
    }
  }
}

export default new UserProjectRepo();
