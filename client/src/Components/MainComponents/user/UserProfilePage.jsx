import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { BASE_URL } from "@/constants"
import useGetApi from "@/CustomHooks/useGetApi"
import usePutApi from "@/CustomHooks/usePutApi"
import { memo, useEffect, useState } from "react"

const UserProfilePage = () => {

    const [userInfo, setUserInfo] = useState(null)
    const [isUpdateUser, setIsUpdateuser] = useState(false)
    // calling get user info api
    const { callApi: getUserInfo, data: user } = useGetApi(`${BASE_URL}/user/userInfo`)

    // calling update api 

    const { callApi: updateUser, data: updateMessage, loading: updateLoading } = usePutApi(`${BASE_URL}/user/updateUserInfo`)
    useEffect(() => {
        getUserInfo()
    }, [])

    // store user info

    useEffect(() => {
        setUserInfo(user?.user)
    }, [user])


    const onCancel = () => {
        setIsUpdateuser(false)
        // calling get user info api
        getUserInfo()
    }

    const OnSave = () => {
        updateUser({
            name: userInfo?.name,
            email: userInfo?.email
        })
    }


    useEffect(() => {
        setIsUpdateuser(false)
    }, [updateMessage])
    return (
        <div className="w-full min-h-screen h-auto  pt-20 bg-slate-100">
            <div className="w-[90vw] h-auto m-auto space-y-8 pb-8">
                <div className=" rounded-sm p-4 border shadow-md bg-white">
                    <h1 className="font-bold text-2xl">Personal Information</h1>
                    {/* personal information */}
                    <div className="grid grid-cols-3 space-y-6 mt-4">
                        <Input className={`col-span-2 bg-white h-10 ${!isUpdateUser && "cursor-not-allowed"}`} type="text" placeholder="Name" value={userInfo?.name} onChange={(e) => {
                            isUpdateUser && setUserInfo((prev) => {
                                return {
                                    ...prev,
                                    name: e.target.value
                                }
                            })
                        }} />
                        <Input className={`col-span-2 bg-white h-10 ${!isUpdateUser && "cursor-not-allowed"}`} type="email" placeholder="Email" value={userInfo?.email}
                            onChange={(e) => {
                                isUpdateUser && setUserInfo((prev) => {
                                    return {
                                        ...prev,
                                        email: e.target.value
                                    }
                                })
                            }} />
                    </div>

                    <div className="mt-3">
                        {
                            isUpdateUser ? <div className="flex space-x-4">
                                <Button onClick={OnSave}>{
                                    updateLoading ? <div className="w-7 h-7 rounded-full bg-transparent border-b-2 border-l-2 animate-spin"></div> : "Save Changes"
                                }</Button>
                                <Button onClick={onCancel}>Cancel</Button></div>
                                :
                                <Button onClick={() => { setIsUpdateuser(true) }}>Edit</Button>
                        }

                    </div>
                </div>


                {/* Role & Permissions */}

                <div className="bg-white rounded-sm p-4 shadow-md border">
                    <h1 className="font-bold text-2xl"> Role & Permissions</h1>

                    <div className=" mt-3 flex space-x-2 items-center">
                        <h1 className="text-lg font-bold text-gray-700">Current Role :</h1>
                        <p className="text-lg mt-1 font-bold text-gray-500">Developer</p>
                    </div>

                    <div className="mt-3">
                        <h1 className="text-xl font-bold text-gray-800">Assigned Projects</h1>

                        <div className="grid grid-cols-3 space-y-4 mt-3">
                            {
                                userInfo?.projects?.map((projects) => {
                                    return (
                                        <div key={projects?._id} className="col-span-2 border  h-auto rounded-xl p-2 shadow-md bg-slate-50">
                                            <h1 className="text-lg font-medium text-gray-700">{projects?.name}</h1>
                                            <p className="text-base text-gray-500">{projects?.description}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>



                {/* Task & Activity Overview */}

            </div>
        </div>
    )
}
export default memo(UserProfilePage)