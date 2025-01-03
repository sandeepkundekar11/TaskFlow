import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { FaTasks, FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import DashbaordChart from "./Chart";
import ResentActivity from "./ResentActivity";


const DashBoard = () => {
    return (
        <div className="w-full h-full">
            <div className=" w-[95%] grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Projects
                        </CardTitle>
                        <GrProjects />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                    </CardContent>
                </Card>

                <Card className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                        <FaUsers />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">100</div>
                    </CardContent>
                </Card>
                <Card className="">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Tasks
                        </CardTitle>
                        <FaTasks />

                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78</div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-[95%] mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle className="text-2xl">Project Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <DashboardChart /> */}
                        <DashbaordChart/>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="text-xl">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <RecentActivity /> */}
                        <ResentActivity/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default DashBoard