import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepo from "../repositories/UserRepo.js";
class UserServices {
  async UserLoginService(email, password) {
    try {
      // first we will check that user available or not
      let userAvailable = await UserRepo.checkUserAvailable(email);
      if (!userAvailable) {
        return { status: 404, message: "user not available" };
      }

      //   now we will check that user password is available or not
      let isPasswordAvailable = await UserRepo.isPasswordAvailable(email);

      if (!isPasswordAvailable) {
        //updated the password and login the user
        let hashedPassword = await bcrypt.hash(password, 12);
        let updatePassword = await UserRepo.updateUserPassword(
          email,
          hashedPassword
        );
        if (!updatePassword) {
          return { status: 404, message: "password has not updated" };
        }
        // upading the Invitation
        await UserRepo.UpdatedInvitation(email);
        // generating the Token
        let user = await UserRepo.checkUserAvailable(email);
        let token = jwt.sign({ user: user }, process.env.JWT_SECRET);
        return { status: 200, user: userAvailable, token };
      }

      // if password is available then check the password validation

      let isPasswordCorrect = await bcrypt.compare(
        password,
        isPasswordAvailable
      );

      if (!isPasswordCorrect) {
        return { status: 401, message: "wrong password" };
      }
      // generating the Token
      let user = await UserRepo.checkUserAvailable(email);
      let token = jwt.sign({ user: user }, process.env.JWT_SECRET);
      return { status: 200, user: userAvailable, token };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
  // get users Project

  async GetAvailableProjects(userId) {
    try {
      let userCompanies = await UserRepo.getUserProjects(userId);
      if (!userCompanies) {
        return { status: 404, message: "user companies not found" };
      }
      return { status: 200, info: userCompanies.projects };
    } catch (error) {
      return { status: 500, message: "internal server error" };
    }
  }



  // get userInfo service

  async getUserInfoService({ userId }) {
    try {
      let userInfo = await UserRepo.getUserInfoRepo({ userId })
      if (userInfo) {
        return { status: 200, user: userInfo }
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }


  // update user
  async updateUserService({ userId, info }) {
    try {
      let updateUser = await UserRepo.updateUserInfoRepo({ userId, info })

      if (updateUser) {
        return {
          status: 200,
          message: "user updated successfully"
        }
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

export default new UserServices();
