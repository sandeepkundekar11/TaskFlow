import ActivityModel from "../model/ActivityLogModel.js";
import UserModel from "../model/UserModel.js";

class ActivityLogRepo {
  // get all
  async getAllCompanyUsers({ companyId }) {
    try {
      return await UserModel.find({ company: companyId });
    } catch (error) {
      console.log("error while getting all company user");
    }
  }

  async getActivitiesLogsOfUser({ userIds, start, endLimit }) {
    try {
      return await ActivityModel.find({ name: { $in: userIds } })
        .populate({
          path: "name",
          model: "user",
          select: "name",
        })
        .sort({ _id: -1 })
        .skip(start)
        .limit(endLimit)
        .exec();
    } catch (error) {
      console.log("error while getting all company user");
    }
  }
}

export default new ActivityLogRepo();
