import ActivityModel from "../model/ActivityLogModel.js";
import ProjectModel from "../model/ProjectModel.js";

const getProjectInitials = (projectName) => {
  return projectName
    .split(" ") // Split by spaces
    .map((word) => word[0].toUpperCase()) // Take the first letter of each word
    .join(""); // Combine into initials
};

const UpdateActivities = async (ActivityData) => {
  try {
    // Destructure the required fields from the input data
    const { name, action, task, TaskId, createdTaskId } = ActivityData;

    // Build the activity object dynamically
    const ActivityObj = {};
    if (name) ActivityObj.name = name;
    if (action) ActivityObj.action = action;
    if (task) ActivityObj.task = task; // string
    // generating the new Task Id
    let newTaskId = await ProjectModel.findOneAndUpdate(
      { _id: createdTaskId },
      {
        $inc: {
          ActivityCount: 1,
        },
      },
      { new: true }
    ); // Create a new activity log entry in the database

    ActivityObj.TaskId = `${getProjectInitials(newTaskId.name)}-${
      newTaskId.ActivityCount
    }`; // "EMS-122"
    await ActivityModel.create(ActivityObj);

    // console.log("Activity logged successfully:", ActivityObj);
  } catch (error) {
    console.error("Error logging activity:", error.message);
    throw new Error("Failed to log activity"); // Optional: Throw error if you need to handle it upstream
  }
};
export default UpdateActivities;
