import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { memo } from "react"

const UserProfilePage = () => {
    return (
        <div className="w-full h-auto  pt-20 bg-slate-100">
            <div className="w-[90vw] h-auto m-auto space-y-8 pb-8">
                <div className=" rounded-sm p-4 border shadow-md bg-white">
                    <h1 className="font-bold text-2xl">Personal Information</h1>
                    {/* personal information */}
                    <div className="grid grid-cols-3 space-y-6 mt-4">
                        <Input className="col-span-2 bg-white h-10" type="text" placeholder="Name" />
                        <Input className="col-span-2 bg-white h-10" type="email" placeholder="Email" />
                        <Input className="col-span-2 bg-white h-10" type="password" placeholder="Password" />
                    </div>

                    <div className="mt-3">
                        <Button>Save Changes</Button>
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
                                [1, 2, 3, 4].map((projects) => {
                                    return (
                                        <div key={projects} className="col-span-2 border  h-auto rounded-xl p-2 shadow-md bg-slate-50">
                                            <h1 className="text-lg font-medium text-gray-700">E-Commerce Platform</h1>
                                            <p className="text-base text-gray-500">Developer</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>



                {/* Task & Activity Overview */}

                <div className="bg-white rounded-sm p-4 shadow-md border">
                    <h1 className="font-bold text-2xl"> Task  Overview</h1>

                    <h1 className="font-bold text-xl mt-3 text-slate-500">Task Status (To-Do, In Progress, Done)</h1>
                    <div className="grid grid-cols-3 h-auto mt-4">
                        <div className="col-span-1">
                            <div className="h-12 w-[85%] flex justify-center items-center  bg-slate-100">TO DO</div>
                            {/* todo task */}
                            <div className=" w-[85%] space-y-4">
                                {/* 1 */}
                                <div className="p-2 border flex">
                                    <p className="text-base font-medium w-[80%]">Implement payment gateway API endpoints</p>
                                    <div className="bg-blue-400 text-sm h-8 w-16 flex items-center justify-center rounded-xl">TODO</div>
                                </div>
                                {/* 2 */}
                                <div className="p-2 border flex">
                                    <p className="text-base font-medium w-[80%]">Implement payment gateway API endpoints</p>
                                    <div className="bg-blue-400 text-sm h-8 w-16 flex items-center justify-center rounded-xl">TODO</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="h-12 w-[85%] flex justify-center items-center  bg-slate-100">IN PROGRESS</div>
                            {/* In progress task */}
                            <div className=" w-[85%]">

                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="h-12 w-[85%] flex justify-center items-center  bg-slate-100">COMPLETED</div>
                            {/* completed task */}
                            <div className=" w-[85%]">

                            </div>
                        </div>
                    </div>
                    <Button className="w-60 mt-6 bg-slate-600 hover:bg-slate-700"> See more..</Button>
                </div>
            </div>
        </div>
    )
}
export default memo(UserProfilePage)