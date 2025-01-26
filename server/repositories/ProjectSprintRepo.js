import ProjectModel from "../model/ProjectModel.js"
import SprintModel from "../model/SprintModel.js"

class ProjectSprintRepo {

    async getSprintInfo({ sprintId }) {
        try {
            return await SprintModel.findOne({ _id: sprintId }).populate({
                path: "project",
                model: "project",
                select: "name description"
            }).populate(
                {
                    path: "Tasks",
                    model: "task",
                    // populating subTasks
                    populate: {
                        path: "subTasks",
                        model: "subtask",
                    }
                }
            )
        } catch (error) {
            console.log("error while getting the SprintInfo")
        }
    }


    // get all available sprint available sprint of that project

    async getAllSprints({ projectId }) {
        try {
            return await SprintModel.find({ project: projectId }, "name Tasks isCompleted")
        } catch (error) {
            console.log("error while getting  all sprints")
        }
    }

    // get project info
    async getProjectInfo(projectId) {
        try {
            return await ProjectModel.findOne({ _id: projectId }, "name description")

        } catch (error) {
            console.log("error while getting  project info")
        }
    }
}
export default new ProjectSprintRepo