import { useState } from "react";

const UseLogin = () => {
  // login info
  const [LoginInfo, setLoginInfo] = useState({
    name: "",
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

  // form handle
  const OnFormHandle = () => {
    const newWarnings = {
      nameWarning: "",
      passwordWarning: "",
    };

    if (LoginInfo.name.length < 6) {
      newWarnings.nameWarning = "Name can't be less then 5 characters";
    } else {
      newWarnings.nameWarning = "";
    }

    if (LoginInfo.password.length < 9) {
      newWarnings.passwordWarning = "Password can't be less then 8 characters";
    } else {
      newWarnings.passwordWarning = "";
    }

    setLoginInfoWarning(newWarnings);

    // form submission
    if (newWarnings.nameWarning === "" && newWarnings.passwordWarning === "") {
      // api call
    }
  };

  return { LoginInfo, LoginInfoWarning, InputHandle, OnFormHandle };
};
export default UseLogin;
