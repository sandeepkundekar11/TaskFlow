import ProjectModel from "../model/ProjectModel.js";
import UserModel from "../model/UserModel.js";

class AdminProjectRepo {
  async findCompanyByName(name) {
    try {
      return await ProjectModel.findOne({ name: name });
    } catch (error) {
      console.log("error occured while checking the company name in db");
    }
  }

  async createNewproject(info) {
    try {
      return await ProjectModel.create(info);
    } catch (error) {
      console.log("error occured while creating the new Project");
    }
  }

  // check the project available or not
  async isProjectAvailable(projectId) {
    try {
      return await ProjectModel.findOne({ _id: projectId });
    } catch (error) {
      console.log("Error occurred while checking the project");
    }
  }
  //   update the project
  async updateProjectAndUsers(info = {}, users = [], ProjectId) {
    try {
      // Build the update object dynamically
      const updateData = {};

      // Add project details to the update object if provided
      if (info?.name) updateData.name = info.name;
      if (info?.description) updateData.description = info.description;
      if (info?.startTime) updateData.startTime = info.startTime;
      if (info?.endTime) updateData.endTime = info.endTime;

      // Add users to the update object if provided
      if (Array.isArray(users) && users.length > 0) {
        updateData.users = users;
      }
      console.log(updateData);
      // If no updates are specified, return an error message
      if (Object.keys(updateData).length === 0) {
        return { success: false, message: "No updates provided." };
      }

      // Update the project in the database
      return await ProjectModel.updateOne(
        { _id: ProjectId },
        { $set: updateData }
      );
    } catch (error) {
      console.log(
        "Error occurred while updating the project and users:",
        error.message
      );
    }
  }

  // get company users
  async getCompanyUsers(companyId) {
    try {
      return await UserModel.find(
        {
          $and: [{ company: companyId }, { invitationStatus: "completed" }],
        },
        "name email"
      );
    } catch (error) {
      console.log("Error occurred while getting the users", error.message);
    }
  }

  //get all users

  async getAllUsers(companyId) {
    try {
      return await UserModel.find(
        { company: companyId },
        "name email invitationStatus taskCount"
      ).populate("taskCount");
    } catch (error) {
      console.log("error occured while getting all users");
    }
  }

  //
  async getAllProjects(companyId) {
    try {
      return await ProjectModel.find(
        { company: companyId },
        "name users tasks status"
      ).populate({
        path: "users",
        model: "user",
        select: "name",
      });
    } catch (error) {
      console.log("error occured while getting all the projects");
    }
  }
}

export default new AdminProjectRepo();
