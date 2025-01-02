import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import userTaskImage from "../../../assets/userTask.jpg";
import userWorkImage from "../../../assets/userWork.avif";
import UseLogin from "../../../CustomHooks/AdminLoginHook";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const AdministartorLogin = () => {
  // login hook
  const { LoginInfo, LoginInfoWarning, InputHandle, OnFormHandle } = UseLogin();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-[900px] w-full flex">
        <div className="w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <p>
              Don&apos;t Have an Account?
              <NavLink to="/" className="text-blue-500">
                Signup
              </NavLink>
            </p>
          </div>
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-gray-500 mb-6">Manage Your Projects With Ous!</p>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                placeholder="xyz@gmail.com"
                value={LoginInfo.name}
                onChange={InputHandle}
                name="name"
              />
              <p className="mt-1 text-sm font-semibold text-red-600">
                {LoginInfoWarning?.nameWarning}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="w-full border-b-2 border-gray-300 focus:border-blue-500 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className=" outline-none py-2 w-11/12"
                  placeholder="••••••••"
                  value={LoginInfo.password}
                  name="password"
                  onChange={InputHandle}
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FaEye className="w-6 h-4" />
                  ) : (
                    <FaEyeSlash className="w-6 h-4" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm font-semibold text-red-600">
                {LoginInfoWarning?.passwordWarning}
              </p>
            </div>

            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
              onClick={OnFormHandle}
            >
              Login
            </button>
          </div>
        </div>

        <div className="w-1/2  rounded-r-lg p-6 text-white">
          <div className="flex justify-center items-center h-full">
            <div>
              <div className="mb-4 h-[600px]">
                <img
                  src={userWorkImage}
                  alt="Chart"
                  className="  max-h-full mx-auto"
                />
                <img
                  src={userTaskImage}
                  alt="Chart"
                  className="  max-h-full mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(AdministartorLogin);
