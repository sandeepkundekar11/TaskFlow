import UserModel from "../model/UserModel.js";

class UserRepo {
  async getUserProjects(userID) {
    try {
      return UserModel.findOne({ _id: userID }, "projects").populate({
        path: "projects",
        model: "project",
        select: "name description _id users",
        populate: {
          path: "users",
          model: "user",
          select: "name _id",
        },
      });
    } catch (error) {
      console.log("error while getting the user Info");
    }
  }

  //check the user available or not
  async checkUserAvailable(email) {
    try {
      return UserModel.findOne({ email: email });
    } catch (error) {
      console.log("error while checking user availability");
    }
  }

  //   check password avaialability
  async isPasswordAvailable(email) {
    try {
      let userPassword = await UserModel.findOne({ email: email });
      return userPassword.password;
    } catch (error) {
      console.log("error while checking user  password availability");
    }
  }

  //   update the password
  async updateUserPassword(email, password) {
    try {
      return UserModel.updateOne(
        { email: email },
        {
          $set: {
            password: password,
          },
        }
      );
    } catch (error) {
      console.log("error while updating the password");
    }
  }

  //   updated Invitation
  async UpdatedInvitation(email) {
    try {
      return UserModel.updateOne(
        { email: email },
        {
          $set: {
            invitationStatus: "available",
          },
        }
      );
    } catch (error) {
      console.log("error while updating the invitation");
    }
  }

  // get user info

  async getUserInfoRepo({ userId }) {
    try {
      return await UserModel.findOne({ _id: userId }).populate({
        path: "projects",
        model: "project",
        select: "name description"
      })
    } catch (error) {
      console.log("error while getting user info");
    }
  }

  // update user info

  async updateUserInfoRepo({ userId, info }) {
    try {
      let { name, email, password } = info
      let obj = {}

      if (name) obj.name = name
      if (email) obj.email = email

      return await UserModel.updateOne({ _id: userId }, {
        $set: obj
      })
    } catch (error) {
      console.log("error while updating  user info");
    }
  }

}

export default new UserRepo();
