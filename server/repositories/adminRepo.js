import AdministratorModel from "../model/AdministratorModel.js";
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

  async createUserInCompany({ name, email, companyId }) {
    try {
      return UserModel.create({ email: email, name: name, company: companyId });
    } catch (error) {
      console.log("error occured while creating new user in to the company");
      throw error;
    }
  }
}

export default new AdminReppsitory();
