import adminService from "../services/adminService.js";
class AdminController {
  //signup admin controller
  async adminSignupController(req, res) {
    let { name, email, password, company } = req.body;
    if (!name || !email || !password || !company) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      let response = await adminService.SignupAdmin({
        name,
        email,
        password,
        company,
      });
      return res.status(response.status).json({
        token: response.token,
        user: response.user,
        message: response.message,
      });
    } catch (error) {
      console.error("Error while creating admin:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // login admin controller
  async adminLoginController(req, res) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        return res.status(404).json({
          message: "Provide all information",
        });
      }

      let response = await adminService.LoginUser({ email, password });
      return res.status(response.status).json({
        token: response.token,
        user: response.user,
        message: response.message,
      });
    } catch (error) {
      console.error("Error while creating admin:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // add user in company controller

  async addUserToCompanyController(req, res) {
    try {
      const { companyEmail, username, userEmail } = req.body;

      if (!companyEmail || !username || !userEmail) {
        return res
          .status(403)
          .json({ message: "please provide all information" });
      }
      const companyId = req.userId;
      const Info = {
        companyEmail,
        companyId,
        username,
        userEmail,
      };
      let response = await adminService.AddUserToCompanyService(Info);

      if (response) {
        return res.status(response.status).json({
          message: response.message,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
export default new AdminController();
