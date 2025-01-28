import ActivityLogsRepo from "../repositories/ActivityLogsRepo.js";

class ActivityLogs {
  async getActivityLog({ companyId, start, endLimit }) {
    try {
      // getting all user which are there in comnpany
      let User = await ActivityLogsRepo.getAllCompanyUsers({ companyId });
      let userIds = User.map((user) => user?._id);

      //   getting the logs of each user

      let activityLogs = await ActivityLogsRepo.getActivitiesLogsOfUser({
        userIds,
        start,
        endLimit,
      });

      if (activityLogs) {
        return { status: 200, activities: activityLogs };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
export default new ActivityLogs();
