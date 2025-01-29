/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMemo } from "react";
const DrgableTaskCard = ({
  onDragStartFun,
  onDragEndFun,
  title,
  Author,
  type,
}) => {
  const InitialName = useMemo(() => {
    const nameParts = Author?.split(" ");
    const initials =
      nameParts?.length >= 2
        ? nameParts[0][0] + nameParts[1][0]
        : Author[0] + (Author[1] || "");
    return initials;
  }, [Author]);
  return (
    <div
      className="w-[98%] m-1 h-auto p-3 bg-white opacity-100 shadow-md cursor-move rounded-md min-h-32 "
      draggable
      onDragStart={onDragStartFun}
      onDragEnd={onDragEndFun}
    >
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          {type === "todo" && (
            <p className="text-sm w-14 font-medium bg-blue-300 rounded-md p-1">
              TODO
            </p>
          )}

          {type === "inprogress" && (
            <p className="text-sm w-24 font-medium bg-yellow-300 rounded-md p-1">
              INPROGRESS
            </p>
          )}

          {type === "completed" && (
            <p className="text-sm w-24 font-medium bg-green-300 rounded-md p-1">
              COMPLETED
            </p>
          )}
        </div>
        <Avatar className="col-span-1">
          <AvatarFallback className="bg-blue-100">{InitialName}</AvatarFallback>
        </Avatar>
      </div>
      {/* Task Content */}
      <div>
        <p className="text-gray-700 mb-3">{title}</p>
      </div>
    </div>
  );
};
export default DrgableTaskCard;
