import { useState } from "react"

const usePostApi = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
        }
        else {
            setError(responseBody.message)
        }

        setLoading(false)
    }

    return { data, loading, error, callApi: PostApi }

}


export default usePostApi