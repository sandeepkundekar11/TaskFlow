import adminProjectService from "../services/adminProjectService.js";

class AdminProjectController {
  async createNewProjectController(req, res) {
    let { name, description, startTime, endTime, users } = req.body;
    let companyId = req.userId;

    try {
      if (!name || !description || !startTime || !endTime || !companyId) {
        return res.status(404).json({ message: "please enter all details" });
      }
      let response = await adminProjectService.addNewproject({
        name,
        description,
        startTime,
        endTime,
        users,
        companyId,
      });

      if (response) {
        return res.status(response.status).json({ message: response.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //   update the  project
  async updateProjectController(req, res) {
    try {
      let { name, description, startTime, endTime, users } = req.body;
      let { projectId } = req.params;
      if (!name && !description && !startTime && !endTime && !users) {
        return res.status(404).json({
          message:
            "No fields provided for update. Please provide at least one field.",
        });
      }
      let response = await adminProjectService.UpdateProject({
        name,
        description,
        startTime,
        endTime,
        users,
        projectId,
      });

      if (response) {
        return res.status(response.status).json({ message: response.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //get allcompany users for adding in project
  async getAllCompanyUsers(req, res) {
    try {
      let CompanyId = req.userId;

      let response = await adminProjectService.getAllUsersService(CompanyId);
      if (response) {
        return res
          .status(response.status)
          .json({ message: response.message, users: response.users });
      }
    } catch (error) {}
  }
}

export default new AdminProjectController();
