import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateComp = () => {
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    const userType = JSON.parse(localStorage.getItem("user")).type;
    if (userType === "user") {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
  }, []);
  return <>{isValidUser ? <Outlet /> : <Navigate to="/user/login" />}</>;
};
export default UserPrivateComp;
