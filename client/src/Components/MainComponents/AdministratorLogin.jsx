import { memo } from "react"
import { NavLink } from "react-router-dom"
import userTaskImage from "../../assets/userTask.jpg"
import userWorkImage from "../../assets/userWork.avif"
const AdministartorLogin = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-[900px] w-full flex">

                <div className="w-1/2 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p>Don&apos;t Have an Account?<NavLink to="/" className="text-blue-500">Signup</NavLink></p>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Login</h2>
                    <p className="text-gray-500 mb-6">Manage Your Projects With Ous!</p>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2" placeholder="xyz@gmail.com" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input type="password" className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2" placeholder="••••••••" />
                         
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">Login</button>
                    </form>
                </div>

                <div className="w-1/2  rounded-r-lg p-6 text-white">
                    <div className="flex justify-center items-center h-full">
                        <div>
                            <div className="mb-4 h-[600px]">
                                <img src={userWorkImage} alt="Chart" className="  max-h-full mx-auto" />
                                <img src={userTaskImage} alt="Chart" className="  max-h-full mx-auto" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(AdministartorLogin)