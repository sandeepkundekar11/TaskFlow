import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import LogoComp from "./LogoComp";
const UserNavbar = () => {
  const Navigate = useNavigate();
  return (
    <Card className="w-screen h-16 fixed top-0 z-50 rounded-none flex justify-between items-center space-x-8 pr-3">
      <LogoComp />
      <div className="flex items-center space-x-8 cursor-pointer pr-4">
        <ul className="flex h-full items-center space-x-8">
          <li className="font-bold" onClick={() => Navigate("/user")}>
            Home
          </li>
          <li
            className="font-bold"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("Token");
              Navigate("/userlogin");
            }}
          >
            SignOut
          </li>
          <li className="font-bold" onClick={()=>Navigate("/user/profile")}>Profile</li>
        </ul>
        {/* <Avatar className="border-gray-600  shadow-2xl w-10 h-10 ">
          <AvatarFallback className="bg-blue-200">AK</AvatarFallback>
        </Avatar> */}
      </div>
    </Card>
  );
};
export default UserNavbar;
