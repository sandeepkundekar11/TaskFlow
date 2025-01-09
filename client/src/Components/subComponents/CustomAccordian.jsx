/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
const CustomTaskAccordian = ({
  className,
  TaskId,
  TaskTitle,
  Author = "new",
  children,
}) => {
  const [name, setName] = useState("a");
  const [showDropdown, setShoDropdown] = useState(false);
  useEffect(() => {
    const nameParts = Author?.split(" ");
    const initials =
      nameParts?.length >= 2
        ? nameParts[0][0] + nameParts[1][0]
        : Author[0] + (Author[1] || "");
    setName(initials);
  }, []);
  return (
    <div className="w-full bg-white mt-2 p-1 overflow-y-hidden">
      <div className={`head h-10 ${className} bg-blue-50`}>
        <div className="flex justify-between items-center">
          <div className="flex">
            <p className="TaskId text-base font-bold">{TaskId}</p>
            <p className="taskTitle text-base font-semibold text-gray-700 ml-2">
              -{TaskTitle}
            </p>
          </div>
          <div className="flex space-x-10">
            <Avatar className="border-gray-600  shadow-2xl border -ml-5">
              <AvatarFallback className="bg-blue-200">
                {name.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <Button>Create SubTask</Button>

            <Button
              variant="outline"
              onClick={() => setShoDropdown(!showDropdown)}
            >
              {showDropdown ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`body  w-full  transition  duration-200 ${
          showDropdown ? "h-auto" : "h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default CustomTaskAccordian;
