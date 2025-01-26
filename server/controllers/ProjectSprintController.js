import ProjectSprintService from "../services/ProjectSprintService.js"

class ProjectSprintController {
    // get project sprint information
    async getProjectSprintController(req, res) {
        const { sprintId } = req.params
        try {
            let projectSprints = await ProjectSprintService.getSprintInfoService({ sprintId })

            if (projectSprints) {
                return res.status(projectSprints.status).json({
                    message: projectSprints.message,
                    sprintInfo: projectSprints.sprints
                })
            }
        } catch (error) {
            return res.status(200).json({ message: error.message })
        }
    }

    //get all project Sprints

    async getAllProjectSprints(req, res) {
        try {
            let { projectId } = req.params

            let allProjects = await ProjectSprintService.getAllSprint({ projectId })
            if (allProjects) {
                return res.status(allProjects.status).json({ message: allProjects.message, allSprints: allProjects.allSprints })
            }
        } catch (error) {

        }
    }

}

export default new ProjectSprintController