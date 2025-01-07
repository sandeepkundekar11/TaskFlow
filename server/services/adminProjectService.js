import UserModel from "../model/UserModel.js";
import adminProjectRepo from "../repositories/adminProjectRepo.js";

class AdminProjectService {
    async addNewproject(projectInfo) {
        const { name, description, startTime, endTime, users, companyId } = projectInfo
        try {
            // first find the project is already added or not
            let existProject = await adminProjectRepo.findCompanyByName(name)
            if (existProject) {
                return { status: 403, message: "Create the project with different name" }
            }

            // finding the userids based on users email
            let userIds
            if (users) {
                userIds = await Promise.all(
                    users.map((email) => {
                        return UserModel.findOne({ email })
                    })
                )
            }

            // create a new project

            let project = await adminProjectRepo.createNewproject({
                name: name,
                description: description,
                startTime,
                endTime,
                users: userIds && userIds,
                company: companyId
            })

            if (project) {
                return { status: 200, message: "Project is added successfully" }
            }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }
}

export default new AdminProjectService