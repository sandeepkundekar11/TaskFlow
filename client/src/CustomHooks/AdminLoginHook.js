import { BASE_URL } from "@/constants";
import { useState } from "react";
import UseSignupPostApi from "./UseSignupPostApi";

const UseLogin = () => {
  // login info
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // login warnings
  const [LoginInfoWarning, setLoginInfoWarning] = useState({
    nameWarning: "",
    passwordWarning: "",
  });

  // input handle
  const InputHandle = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...LoginInfo,
      [name]: value,
    });
  };

    // calling api
    const { data, error, loading ,callApi } = UseSignupPostApi(`${BASE_URL}/admin/adminlogin`,LoginInfo)
  // form handle
  const OnFormHandle = () => {
    const newWarnings = {
      nameWarning: "",
      passwordWarning: "",
    };

    if (LoginInfo.email.length < 6) {
      newWarnings.nameWarning = "email can't be less then 5 characters";
    } else {
      newWarnings.nameWarning = "";
    }

    if (LoginInfo.password.length < 7) {
      newWarnings.passwordWarning = "Password can't be less then 7 characters";
    } else {
      newWarnings.passwordWarning = "";
    }

    setLoginInfoWarning(newWarnings);

    // form submission
    if (newWarnings.nameWarning === "" && newWarnings.passwordWarning === "") {
      // api call
      callApi()
    }
  };

  return { LoginInfo, LoginInfoWarning, InputHandle, OnFormHandle ,data, error, loading};
};
export default UseLogin;
