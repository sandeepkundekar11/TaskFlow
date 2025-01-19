import Toasters from "@/Components/Utilities/Toasters"
import { useState } from "react"

const usePostApi = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { SuccessToaster, ErrorToaster } = Toasters()
    const PostApi = async (info) => {
        setLoading(true)
        let token = JSON.parse(localStorage.getItem("Token"))
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        })
        let responseBody = await response.json()
        if (response.status === 200) {
            setData(responseBody)
            SuccessToaster("User Add Successfully")
        }
        else {
            setError(responseBody.message)
            ErrorToaster(responseBody.message)
        }

        setLoading(false)
    }

    return { data, loading, error, callApi: PostApi }

}


export default usePostApi