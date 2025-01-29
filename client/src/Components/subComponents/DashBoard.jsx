import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FaTasks, FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import DashbaordChart from "./Chart";
import ResentActivity from "./ResentActivity";
import useGetApi from "@/CustomHooks/useGetApi";
import { BASE_URL } from "@/constants";
import { useEffect, useState } from "react";

const DashBoard = () => {
  // calling the dashboardApi

  const { callApi: getSagBoard, data: dashboardData } = useGetApi(
    `${BASE_URL}/admin/dashboard`
  );
  const [dashboard, setDashBoard] = useState();
  useEffect(() => {
    getSagBoard();
  }, []);

  useEffect(() => {
    setDashBoard(dashboardData?.dashboard);
  }, [dashboardData]);
  return (
    <div className="w-full h-full">
      <div className=" w-[95%] grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <GrProjects />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.totalProject}</div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <FaUsers />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <FaTasks />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.totalTask}</div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active SubTasks
            </CardTitle>
            <FaTasks />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.totalSubtask}</div>
          </CardContent>
        </Card>
      </div>
      <div className="w-[95%] mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-2xl">Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <DashboardChart /> */}
            <DashbaordChart data={dashboard?.chartData} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <RecentActivity /> */}
            <ResentActivity data={dashboard?.userActivites} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default DashBoard;
