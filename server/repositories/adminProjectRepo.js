import ProjectModel from "../model/ProjectModel.js";

class AdminProjectRepo {
    async findCompanyByName(name) {
        try {
            return await ProjectModel.findOne({ name: name })
        } catch (error) {
            console.log("error occured while checking the company name in db")
        }
    }

    async createNewproject(info) {
        try {
            return await ProjectModel.create(info)
        } catch (error) {
            console.log("error occured while creating the new Project")
        }
    }
}

export default new AdminProjectRepo