import ProjectSprintRepo from "../repositories/ProjectSprintRepo.js"

class ProjectSprintService {
    async getSprintInfoService({ sprintId }) {
        try {
            // getting all projectSprints info
            let projectSpritInfo = await ProjectSprintRepo.getSprintInfo({ sprintId })

            if (projectSpritInfo) {
                return {
                    status: 200,
                    sprints: projectSpritInfo
                }
            }

        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    // get all available sprints
    async getAllSprint({ projectId }) {
        try {
            let allSprints = await ProjectSprintRepo.getAllSprints({ projectId })
            // get project info
            let projectInfo = await ProjectSprintRepo.getProjectInfo(projectId)
            return {
                status: 200,
                allSprints: {
                    projectInfo,
                    sprints:allSprints
                }
            }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }


}

export default new ProjectSprintService