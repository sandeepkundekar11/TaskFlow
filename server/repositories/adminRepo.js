import ActivityModel from "../model/ActivityLogModel.js";
import AdministratorModel from "../model/AdministratorModel.js";
import ProjectModel from "../model/ProjectModel.js";
import SubTaskModel from "../model/SubTasksModel.js";
import TaskModel from "../model/TaskModel.js";
import UserModel from "../model/UserModel.js";
import mongoose from "mongoose";

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
      return await ProjectModel.findOne(
        { _id: projectId },
        "name description startTime status users"
      ).populate({
        path: "users",
        model: "user",
        select: "company",
      });
    } catch (error) {
      console.log("error while getting the project info");
    }
  }

  // getting the project Activity
  async projectActivities({ userIds, start, limit, projectname }) {
    const getProjectInitials = (projectName) => {
      return projectName
        .split(" ") // Split by spaces
        .map((word) => word[0].toUpperCase()) // Take the first letter of each word
        .join(""); // Combine into initials
    };
    try {
      return await ActivityModel.find({
        name: { $in: userIds },
        TaskId: {
          $regex: getProjectInitials(projectname),
          $options: "i",
        },
      })
        .populate({
          path: "name",
          model: "user",
          select: "name",
        })
        .sort({ _id: -1 })
        .skip(start)
        .limit(limit - start)
        .exec();
    } catch (error) {
      console.log("error while getting the project user activities");
    }
  }

  // get user activity
  async getUserInfo({ userId }) {
    try {
      return await UserModel.findOne({ _id: userId }, "name email role");
    } catch (error) {
      console.log("error while getting  the user info");
    }
  }

  // get user activitis
  async getUserActivity({ userId, start, limit }) {
    try {
      return await ActivityModel.find({ name: userId })
        .sort({ _id: -1 })
        .skip(start)
        .limit(limit - start)
        .exec();
    } catch (error) {
      console.log("error while getting  the user activity");
    }
  }

  // get admin info
  async getAdminInfo({ adminId }) {
    try {
      return await AdministratorModel.findOne(
        { _id: adminId },
        "company email description"
      );
    } catch (error) {
      console.log("error while getting  the adminInfo");
    }
  }

  // update admin

  async updateAdmin({ adminId, infoToUpdate }) {
    let { email, company, description } = infoToUpdate;
    let obj = {};
    if (email) obj.email = email;
    if (company) obj.company = company;
    if (description) obj.description = description;

    try {
      return await AdministratorModel.updateOne(
        { _id: adminId },
        { $set: obj }
      );
    } catch (error) {
      console.log("error while setting the admin info");
    }
  }

  // delete user and delete user realated all information
  async deleteUserData({ userId }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find all tasks authored by the user
      const userTasks = await TaskModel.find({ author: userId })
        .select("_id")
        .session(session);
      const taskIds = userTasks.map((task) => task._id);

      // Delete all subtasks where the user is the author
      await SubTaskModel.deleteMany({ author: userId }).session(session);

      // Delete all tasks where the user is the author
      await TaskModel.deleteMany({ author: userId }).session(session);

      // Remove the user from all projects and their associated tasks
      await ProjectModel.updateMany(
        { users: userId },
        {
          $pull: {
            users: userId,
            tasks: { $in: taskIds }, // Remove user's tasks from projects
          },
        }
      ).session(session);

      // Delete all activities related to the user
      await ActivityModel.deleteMany({ name: userId }).session(session);

      //  delete user from db

      let user = await UserModel.deleteOne({ _id: userId }).session(session);
      // Commit transaction
      await session.commitTransaction();
      session.endSession();

      console.log(`User ${userId} and all related data successfully deleted`);
      return user;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error while deleting user data:", error);
    }
  }

  // then remove the user from the data base
}

export default new AdminReppsitory();
