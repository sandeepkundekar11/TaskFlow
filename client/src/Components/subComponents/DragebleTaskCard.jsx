/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const DrgableTaskCard = ({ onDragStartFun, onDragEndFun, Task }) => {
  return (
    <div
      className="w-[98%] m-1 h-auto p-3 bg-white opacity-100 shadow-md cursor-move rounded-md min-h-32 "
      draggable
      onDragStart={onDragStartFun}
      onDragEnd={onDragEndFun}
    >
      <div className="grid grid-cols-4">
        <h1 className="col-span-3 font-bold">SAP-11</h1>
        <Avatar className="col-span-1">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      {/* Task Content */}
      <div>
        <p className="text-gray-700">{Task}</p>
      </div>
    </div>
  );
};
export default DrgableTaskCard;
