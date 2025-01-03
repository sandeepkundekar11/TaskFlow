import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const AdminPrivateComp = () => {
  const [isUserAdimn, setIsUserAdmin] = useState(true);

  useEffect(() => {
    const userType = JSON.parse(localStorage.getItem("Admin"))?.type;
    if (userType !== "admin") {
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
  }, []);
  return (
    <>{isUserAdimn ? <Outlet /> : <Navigate to="/administrativeLogin" />}</>
  );
};
export default AdminPrivateComp;
