import { memo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import userTaskImage from "../../assets/userTask.jpg";
import userWorkImage from "../../assets/userWork.avif";
import UseSignup from "../../CustomHooks/SignupHook";

const AddMinistratorSignup = () => {
    const { SignUpInfo, SignUpInfoWarning, passwordWarning, onPasswordChange, OnInputHandel, OnFormHandel } = UseSignup()

    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-[900px] w-full flex">

                <div className="w-1/2 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p>Already have an Account?<NavLink to="/administrativeLogin" className="text-blue-500">Login</NavLink></p>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
                    <p className="text-gray-500 mb-6">Manage Your Projects With Ous!</p>
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input type="text" value={SignUpInfo.name} onChange={OnInputHandel} name="name" className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2" placeholder="admin" />
                            <p className="mt-1 text-sm font-semibold text-red-600">{SignUpInfoWarning?.nameWarning}</p>

                        </div>
                        <div className="mb- 4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input type="email" value={SignUpInfo.email} name="email" onChange={OnInputHandel} className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2" placeholder="xyz@gmail.com" />
                            <p className="mt-1 text-sm font-semibold text-red-600">{SignUpInfoWarning?.emailWarning}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Company Name</label>
                            <input type="email" value={SignUpInfo.company} onChange={OnInputHandel} name="company" className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2" placeholder="XYZ" />
                            <p className="mt-1 text-sm font-semibold text-red-600">{SignUpInfoWarning?.companyWarning}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <div className="w-full border-b-2 border-gray-300 focus:border-blue-500 flex items-center">
                                <input value={SignUpInfo.password} name="password" onChange={onPasswordChange} type={showPassword ? "text" : "password"} className=" w-11/12 h-full bg-transparent outline-none py-2" placeholder="••••••••" />
                                <button onClick={() => { setShowPassword(!showPassword) }}>
                                    {
                                        showPassword ? <FaEye className="w-6 h-4" /> : <FaEyeSlash className="w-6 h-4" />
                                    }
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                {
                                    passwordWarning.CharacterLength ? <div><span className="text-green-500 text-base pr-2">✔</span> Least 8 characters</div> :
                                        <div><span className="text-red-500 font-bold text-base pr-2">X</span> Least 8 characters</div>
                                }
                                {
                                    passwordWarning.IsNumberAvailable ? <div><span className="text-green-500 text-base pr-2">✔</span> Least one number (0-9)</div> :
                                        <div><span className="text-red-500 font-bold text-base pr-2">X</span> Least one number (0-9)</div>
                                }
                                {
                                    passwordWarning.IsLowerAndUpperCase ? <div> <span className="text-green-500 text-base pr-2">✔</span> Lowercase (a-z) and uppercase (A-Z)</div> :
                                        <div> <span className="text-red-500 font-bold text-base pr-2">X</span> Lowercase (a-z) and uppercase (A-Z)</div>
                                }

                            </p>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4" onClick={OnFormHandel}>Sign Up</button>
                    </div>



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
export default memo(AddMinistratorSignup)