import UserModel from "../model/UserModel.js";
import adminProjectRepo from "../repositories/adminProjectRepo.js";

class AdminProjectService {
  async addNewproject(projectInfo) {
    const { name, description, startTime, endTime, users, companyId } =
      projectInfo;
    try {
      // first find the project is already added or not
      let existProject = await adminProjectRepo.findCompanyByName(name);
      if (existProject) {
        return {
          status: 403,
          message: "Create the project with different name",
        };
      }

      // finding the userids based on users email
      let userIds;
      if (users) {
        userIds = await Promise.all(
          users.map((email) => {
            return UserModel.findOne({ email });
          })
        );
      }

      // create a new project

      let project = await adminProjectRepo.createNewproject({
        name: name,
        description: description,
        startTime,
        endTime,
        users: userIds && userIds,
        company: companyId,
      });

      if (project) {
        let projectId = project._id;
        await Promise.all(
          users.map((email) => {
            return UserModel.updateOne(
              { email: email },
              {
                $addToSet: { projects: projectId },
              }
            );
          })
        );
        return { status: 200, message: "Project is added successfully" };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // update Project
  async UpdateProject(projectInfo) {
    const { name, description, startTime, endTime, users, projectId } =
      projectInfo;

    try {
      //checking that project available or not
      let projectExist = await adminProjectRepo.isProjectAvailable(projectId);

      if (!projectExist) {
        return { status: 404, message: "Project Not found" };
      }
      // finding the userids based on users email
      let userIds;
      if (users) {
        userIds = await Promise.all(
          users.map((email) => {
            return UserModel.findOne({ email });
          })
        );
      }

      let UpdateUser = await adminProjectRepo.updateProjectAndUsers(
        {
          name,
          description,
          startTime,
          endTime,
        },
        userIds,
        projectId
      );
      if (UpdateUser) {
        return { status: 200, message: "project has updated successfully" };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // get users to add in the project

  async getAllUsersService(companyId) {
    try {
      let companyUsers = await adminProjectRepo.getCompanyUsers(companyId);
      if (companyUsers) {
        return { status: 200, users: companyUsers };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async getAllUserTaskCounts(companyId) {
    try {
      let AllUserTaskCounts = await adminProjectRepo.getAllUsers(companyId)
      if (AllUserTaskCounts) {
        return { status: 200, users: AllUserTaskCounts }
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

export default new AdminProjectService();
