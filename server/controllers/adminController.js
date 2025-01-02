import adminService from "../services/adminService.js";
class AdminController {
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
}
export default new AdminController();
