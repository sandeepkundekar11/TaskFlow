import AdministratorModel from "../model/AdministratorModel.js";

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
}

export default new AdminReppsitory();
