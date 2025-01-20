import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const AdminLog = () => {
  return (
    <div className="w-full">
      <Card className="w-full border-1 my-3 flex flex-col justify-center">
        <CardContent className="flex items-start py-3">
          <Avatar>
            <AvatarFallback className="bg-slate-300">CN</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <div className="flex space-x-1">
              <p className="font-semibold">Sandeep k</p>
              <p className="text-gray-600">May 10, 2023 17:00</p>
            </div>
            <div className="">
              <span className="flex space-x-2">
                {" "}
                <p className="font-bold bg-green-300 text-green-900 px-2 rounded-lg">
                  Completed
                </p>
                <p className="font-bold text-gray-500">#EM-10</p>
              </span>
              <p>Changed status of Design database schema to In Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminLog;
