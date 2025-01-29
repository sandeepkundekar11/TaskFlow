import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminReppsitory from "../repositories/adminRepo.js";
import MailSender from "../Utility/MailSender.js";
import adminRepo from "../repositories/adminRepo.js";
class AdminService {
  // signup service
  async SignupAdmin(info) {
    try {
      const isAdminExist = await AdminReppsitory.findAdminByEmail(info.email);
      if (isAdminExist) {
        return { status: 400, message: "Admin already exists" };
      }

      //   hash the password
      let hashPassword = await bcrypt.hash(info.password, 10);
      let adminInfo = {
        name: info.name,
        email: info.email,
        password: hashPassword,
        company: info.company,
      };
      const admin = await AdminReppsitory.createAdmin(adminInfo);
      let token = jwt.sign({ user: admin }, process.env.JWT_SECRET);
      return { status: 200, token, user: admin };
    } catch (error) {
      console.error("Error while creating admin:", error);
      throw error;
    }
  }

  // login service
  async LoginUser(info) {
    try {
      let userExist = await AdminReppsitory.findAdminByEmail(info.email);
      if (!userExist) {
        return {
          status: 404,
          message: "user not found",
        };
      }

      let token = jwt.sign({ user: userExist }, process.env.JWT_SECRET);
      let checkPassword = await bcrypt.compare(
        info.password,
        userExist.password
      );
      if (!checkPassword) {
        return {
          status: 401,
          message: "Wrong password",
        };
      }

      return {
        status: 200,
        token: token,
        user: userExist,
      };
    } catch (error) {
      console.error("Error while creating admin:", error);
      throw error;
    }
  }

  // adding the user in the project
  async AddUserToCompanyService({
    companyEmail,
    senderName,
    companyId,
    username,
    userEmail,
  }) {
    try {
      // checking user is already added in  comany or not
      let IsuserAdded = await AdminReppsitory.findUserInCompany(
        companyId,
        userEmail
      );
      console.log(IsuserAdded);
      if (IsuserAdded) {
        return { status: 403, message: "user already added" };
      }

      // creating user in company
      //{ email: email, name: name, company: companyId }
      let createUserInCompany = await AdminReppsitory.createUserInCompany({
        name: username,
        email: userEmail,
        company: companyId,
      });

      if (createUserInCompany) {
        let mailInfo = {
          senderEmail: companyEmail,
          senderName: senderName,
          receiverEmail: userEmail,
          receiverName: username,
        };
        //sending the inivtation mail
        let mail = await MailSender(mailInfo);

        if (mail) {
          return {
            status: 200,
            message: "User added and Initation is Been send",
          };
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  // get dashBoard data

  async getDashboardData({ companyId }) {
    try {
      // getting the all projects of company
      let allProject = await adminRepo.adminGetProject({ companyId });

      // getting all users of company
      let allUsers = await adminRepo.adminGetAllUsersOfCompany({ companyId });

      let userIds = allUsers.map((user) => user._id);
      // gettting all tasks of company
      let allTask = await adminRepo.adminGetAlTaskOfCompany({ userIds });

      // getting all Subtask of company
      let allSubTask = await adminRepo.adminGetAllSubataskOfCompany({
        userIds,
      });

      // getting chart data
      let chartData = [
        {
          name: "TODO",
          value: allSubTask.filter((subtask) => subtask.status === "todo")
            .length,
        },
        {
          name: "INPROGRESS",
          value: allSubTask.filter((subtask) => subtask.status === "inProgress")
            .length,
        },
        {
          name: "COMPLETED",
          value: allSubTask.filter((subtask) => subtask.status === "completed")
            .length,
        },
      ];

      // getting latest 4 activities

      let userActivites = await adminRepo.getLatestActivities({ userIds });

      if (allProject && allUsers && allTask && allSubTask) {
        return {
          status: 200,
          dashboard: {
            totalProject: allProject.length,
            totalUsers: allUsers.length,
            totalTask: allTask.length,
            totalSubtask: allSubTask.length,
            chartData,
            userActivites,
          },
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}

export default new AdminService();
