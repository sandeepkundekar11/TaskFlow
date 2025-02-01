/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import TimeUtililty from "../Utilities/TimeUtility";

const AdminLog = ({ info }) => {
  const { updateTime } = TimeUtililty();

  return (
    <div className="w-full">
      <Card className="w-full border-1 my-3 flex flex-col justify-center">
        <CardContent className="flex items-start py-3">
          <Avatar>
            <AvatarFallback className="bg-slate-300">CN</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <div className="flex space-x-1">
              <p className="font-semibold">{info?.name?.name}</p>
              <p className="text-gray-600">{updateTime(info?.timeStamp)}</p>
            </div>
            <div className="">
              <span className="flex space-x-2">
                {info?.action == "Updated" && (
                  <p className="font-bold bg-green-300 text-green-900 px-2 rounded-lg">
                    {info?.action}
                  </p>
                )}

                {info?.action == "Created" && (
                  <p className="font-bold bg-blue-300 text-blue-900 px-2 rounded-lg">
                    {info?.action}
                  </p>
                )}

                {info?.action == "Deleted" && (
                  <p className="font-bold bg-red-300 text-red-900 px-2 rounded-lg">
                    {info?.action}
                  </p>
                )}

                <p className="font-bold text-gray-500">#{info?.TaskId}</p>
              </span>
              <p>{info?.task}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminLog;
