/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AvatarGroup = ({ users = [] }) => {
  return (
    <div className="flex items-center">
      <div className="flex w-20">
        {users.map((user, index) => {
          if (index <= 3) {
            const nameParts = user?.split(" ");
            const initials =
              nameParts.length >= 2
                ? nameParts[0][0] + nameParts[1][0]
                : user[0] + (user[1] || "");
            return (
              <Avatar
                key={index}
                className="border-gray-600  shadow-2xl border -ml-5"
              >
                <AvatarFallback className="bg-blue-200">
                  {initials.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            );
          }
        })}
      </div>
      <div className="  z-20">
        {users.length > 4 && <div>+ {users.length - 4}</div>}
      </div>
    </div>
  );
};
export default AvatarGroup;
