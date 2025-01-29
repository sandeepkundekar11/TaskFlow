import ActivityModel from "../model/ActivityLogModel.js";
import AdministratorModel from "../model/AdministratorModel.js";
import ProjectModel from "../model/ProjectModel.js";
import SubTaskModel from "../model/SubTasksModel.js";
import TaskModel from "../model/TaskModel.js";
import UserModel from "../model/UserModel.js";

class AdminReppsitory {
  async findAdminByEmail(email) {
    try {
      return await AdministratorModel.findOne({ email: email });
    } catch (error) {
      console.error("Error finding admin by email:", error);
      throw error;
    }
  }

  async createAdmin(admin) {
    try {
      return await AdministratorModel.create(admin);
    } catch (error) {
      console.error("Error while creating admin:", error);
      throw error;
    }
  }

  async findUserInCompany(companyId, userEmail) {
    try {
      return await UserModel.findOne({
        $and: [{ email: userEmail }, { company: companyId }],
      });
    } catch (error) {
      console.log("error occured while finding user in the company");
      throw error;
    }
  }

  async createUserInCompany(userInfo) {
    //{ name, email, companyId }
    try {
      return UserModel.create(userInfo);
    } catch (error) {
      console.log("error occured while creating new user in to the company");
      throw error;
    }
  }

  // get the all project of the Company
  async adminGetProject({ companyId }) {
    try {
      return await ProjectModel.find({ company: companyId });
    } catch (error) {
      console.log("error while getting the all projects of company");
    }
  }

  // get the all Users of the company
  async adminGetAllUsersOfCompany({ companyId }) {
    try {
      return await UserModel.find({ company: companyId });
    } catch (error) {
      console.log("error while getting the all users of company");
    }
  }

  // get the alll tasks of the company
  async adminGetAlTaskOfCompany({ userIds }) {
    try {
      return await TaskModel.find({ author: { $in: userIds } });
    } catch (error) {
      console.log("error while getting the all task of company");
    }
  }

  // get all subTask of the Company
  async adminGetAllSubataskOfCompany({ userIds }) {
    try {
      return await SubTaskModel.find({ author: { $in: userIds } });
    } catch (error) {
      console.log("error while getting the all subtasks of company");
    }
  }

  // get latest activitis
  async getLatestActivities({ userIds }) {
    try {
      return await ActivityModel.find({
        name: {
          $in: userIds,
        },
      })
        .populate({
          path: "name",
          model: "user",
          select: "name",
        })
        .sort({ _id: -1 })
        .skip(0)
        .limit(4)
        .exec();
    } catch (error) {
      console.log("error while getting the  activities of company users ");
    }
  }


  // getting the project info
  async getProjectInfoRepo({ projectId }) {
    try {
      return await ProjectModel.findOne({ _id: projectId }, "name description startTime status users")
    } catch (error) {
      console.log("error while getting the project info");
    }
  }

  // getting the project Activity
  async projectActivities({ userIds, start, end }) {
    try {
      return await ActivityModel.find({ name: { $in: userIds } }).populate({
        path: "name",
        model: "user",
        select: "name"
      }).sort({ _id: -1 })
        .skip(start)
        .limit(end)
        .exec()
    } catch (error) {
      console.log("error while getting the project user activities");
    }
  }
}

export default new AdminReppsitory();
