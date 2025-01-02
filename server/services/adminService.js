import AdminReppsitory from "../repositories/adminRepo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class AdminService {
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
      let token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
      return { status: 200, token, user: admin };
    } catch (error) {
      console.error("Error while creating admin:", error);
      throw error;
    }
  }
}

export default new AdminService();
