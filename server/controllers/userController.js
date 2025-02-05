import UserServices from "../services/UserServices.js";

class UserController {
  // logiggin up the user
  async LoginUser(req, res) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        return res.status(404).json({ message: "Provide all details" });
      }
      let response = await UserServices.UserLoginService(email, password);
      return res.status(response.status).json({
        user: response.user,
        message: response.message,
        token: response.token,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //   getting all user projects
  async getUserProjects(req, res) {
    try {
      let userId = req.userId;
      let response = await UserServices.GetAvailableProjects(userId);

      return res.status(response.status).json({
        message: response.message,
        projects: response.info,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


  // get userInfo controller

  async getUserInfoController(req, res) {
    try {
      let userId = req.userId

      let getUserInfo = await UserServices.getUserInfoService({ userId })

      if (getUserInfo) {
        return res.status(getUserInfo.status).json({
          message: getUserInfo.message,
          user: getUserInfo.user
        })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }



  // update user Info

  async updateUserInfo(req, res) {
    let userId = req.userId
    let { name, email } = req.body
    let info = { name, email }
    try {
      let updateUser = await UserServices.updateUserService({ userId, info })
      if (updateUser) {
        return res.status(updateUser.status).json({ message: updateUser.message })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
export default new UserController();
