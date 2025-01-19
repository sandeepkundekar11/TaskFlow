import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import useUserLogin from "@/CustomHooks/userUserLogin";
import { BASE_URL } from "@/constants";
import { useNavigate } from "react-router-dom";
import userlogin from "../../../assets/userLogin.jpg";

const UserLoginPage = () => {
    const Navigate=useNavigate()
    const { data, loading, error, callApi } = useUserLogin(`${BASE_URL}/user/loginUser`)
    const [showPassword, setShowPassword] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })
    const [userInfWarning, setUserInfoWarning] = useState({
        emailWarning: "",
        passwordWarning: ""
    })

    const onInputHandle = (e) => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }


    const onFormSubmit = () => {
        let newWarning = {
            emailWarning: "",
            passwordWarning: ""
        }

        if (userInfo.email.length < 6) {
            newWarning.emailWarning = "email can't be less then 5 characters"
        }
        else {
            newWarning.emailWarning = ""
        }

        if (userInfo.password.length < 6) {
            newWarning.passwordWarning = "password can't be less then 5 characters"
        }
        else {
            newWarning.passwordWarning = ""
        }


        setUserInfoWarning(newWarning)
        // submit

        if (Object.values(newWarning).every(val => val === "")) {
            // form submitted
            callApi(userInfo)
        }
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))?.role
        if (user === "user") {
          Navigate("/user")
        }
      }, [])
    return (
        <div className="w-screen h-screen  overflow-x-hidden flex">
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="form w-[480px] h-auto ">
                    <h1 className="text-2xl  text-center font-semibold">Login to your account</h1>
                    <p className="text-gray-600 text-center">Enter your email below to login to your account</p>

                    <div className="grid w-full max-w-sm mt-6 m-auto items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" value={userInfo.email} onChange={onInputHandle} name="email" />
                        <p className="text-sm font-semibold text-red-600">{userInfWarning.emailWarning}</p>
                    </div>

                    <div className="grid w-full max-w-sm m-auto items-center mt-7 gap-1.5">

                        <Label htmlFor="password">Password</Label>

                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} name="password" value={userInfo.password} onChange={onInputHandle} id="password" placeholder="Password" />
                            <button className="absolute right-2 top-[8px]" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEye className="w-6 " /> : <FaEyeSlash className="w-6" />
                                }
                            </button>
                        </div>
                        <p className="text-sm font-semibold text-red-600">{userInfWarning.passwordWarning}</p>
                    </div>

                    <div className="w-full flex justify-center mt-6">
                        <Button className="max-w-sm  m-auto w-full h-9 text-white flex justify-center items-center" onClick={onFormSubmit}>
                            {
                                loading ?
                                    <div className="w-8 h-8 rounded-full bg-transparent border border-b-2 animate-spin"></div>
                                    : "Login"
                            }
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-sm font-semibold text-red-600 m-auto mt-1 ">{error}</p>
                    </div>

                </div>
            </div>
            <div className="w-1/2 h-screen flex justify-center items-center bg-slate-100">
                <img className="w-72 h-60" src={userlogin} alt="" />
            </div>
        </div>
    )
}
export default UserLoginPage