import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const AdminPrivateComp = () => {
  const [isUserAdmin, setIsUserAdmin] = useState(true);

  useEffect(() => {
    const userType = JSON.parse(localStorage.getItem("user"))?.type;
    if (userType === "admin") {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, []);
  return (
    <>{isUserAdmin ?
      <Outlet />
      : <Navigate to="/administrativeLogin" />}</>
  );
};
export default AdminPrivateComp;
