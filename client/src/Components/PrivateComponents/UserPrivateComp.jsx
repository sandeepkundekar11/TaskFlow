import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "../subComponents/userNavBar";

const UserPrivateComp = () => {
  const [isValidUser, setIsValidUser] = useState(true);

  useEffect(() => {
    const userType = JSON.parse(localStorage.getItem("user"))?.type;
    if (userType !== "user") {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
  }, []);
  return <>{isValidUser ? <>
    <UserNavbar />
    <Outlet /> </> :
    <Navigate to="/userlogin" />}</>;
};
export default UserPrivateComp;
