/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
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
    <div className="w-full bg-white mt-2 px-2 overflow-y-hidden rounded-md">
      {/*  */}
      <div className={`head h-12 ${className} `}>
        <div className="flex justify-between h-full px-3 items-center">
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

            <Button variant="outline" className='w-28 h-9 text-sm'>Create SubTask</Button>

            <Button
              variant="outline"
              onClick={() => setShoDropdown(!showDropdown)}
            >
              {showDropdown ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        className={`body  w-full  transition  duration-200 p-0 ${
          showDropdown ? "h-auto" : "h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default CustomTaskAccordian;
