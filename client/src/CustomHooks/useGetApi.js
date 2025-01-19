import { useState } from "react"

const useGetApi = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const GetApi = async () => {
        setLoading(true)
        let token = JSON.parse(localStorage.getItem("Token"))
        let response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`, // Note: Authorization header key is case-sensitive
            }
        })
        let responseBody = await response.json()
        if (response.status === 200) {
            setData(responseBody)
        }
        else {
            setError(responseBody.message)
        }

        setLoading(false)
    }

    return { data, loading, error, callApi: GetApi }

}


export default useGetApi