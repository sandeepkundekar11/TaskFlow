import activitylogsService from "../services/activitylogsService.js";

class ActivitiesLogsController {
  async getUserActivitiesLogs(req, res) {
    try {
      let { start, endLimit } = req.query;
      let companyId = req.CompanyId;
      let userActivities = await activitylogsService.getActivityLog({
        companyId,
        start,
        endLimit,
      });

      if (userActivities) {
        return res.status(userActivities.status).json({
          message: userActivities.message,
          activities: userActivities.activities,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new ActivitiesLogsController();
