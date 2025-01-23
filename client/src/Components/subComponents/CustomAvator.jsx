/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const CustomAvator = ({ user }) => {
  const nameParts = user.split(" ");
  const initials =
    nameParts.length >= 2
      ? nameParts[0][0] + nameParts[1][0]
      : user[0] + (user[1] || "");
  return (
    <Avatar className="border-gray-600  shadow-2xl border -ml-5 h-10 w-10 mr-2">
      <AvatarFallback className="bg-blue-200">
        {initials.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
export default CustomAvator;
