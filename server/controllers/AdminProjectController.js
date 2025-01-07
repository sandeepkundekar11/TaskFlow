import adminProjectService from "../services/adminProjectService.js"

class AdminProjectController {
    async createNewProjectController(req, res) {
        let { name, description, startTime, endTime, users } = req.body
        let companyId = req.userId

        try {

            if (!name || !description || !startTime || !endTime || !companyId) {
                return res.status(404).json({ message: "please enter all details" })
            }
            let response = await adminProjectService.addNewproject({
                name, description, startTime, endTime, users, companyId
            })

            if (response) {
                return res.status(response.status).json({ message: response.message })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default new AdminProjectController