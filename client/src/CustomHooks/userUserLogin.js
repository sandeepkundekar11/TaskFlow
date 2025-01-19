
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const useUserLogin = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const Navigate = useNavigate()

    const PostApi = async (user) => {
        try {
            setLoading(true)
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            })

            let responseData = await response.json()
            if (responseData.token) {
                setLoading(false)
                setData(responseData.user)
                localStorage.setItem("user", JSON.stringify(responseData?.user))
                localStorage.setItem("Token", JSON.stringify(responseData?.token))
                Navigate("/user")
            }
            else
            {
                setError(responseData.message)
                setLoading(false)
            }

            return responseData
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    


    return { data, loading, error, callApi: PostApi }
}
export default useUserLogin