import AdminUsers from "@/Components/subComponents/AdminUsers";
import ProjectOverView from "@/Components/subComponents/ProjectOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { memo } from "react";
import DashBoard from "../../subComponents/DashBoard";

const AdminiStrativeDashboard = () => {



  return (
    <div className="w-screen h-full p-4 overflow-x-hidden ">
      <h1 className="Heading text-4xl font-bold  text-black">Dashboard</h1>
      {/* small tabs */}

      <Tabs defaultValue={"Overview"} className="w-[800px]  mt-5">
        <TabsList>
          <TabsTrigger className="w-44" value="Overview" >Overview</TabsTrigger>
          <TabsTrigger className="w-44" value="Projects">Projects</TabsTrigger>
          <TabsTrigger className="w-44" value="Users">Users</TabsTrigger>
        </TabsList>
        <TabsContent className="w-screen " value="Overview">
          <DashBoard />
        </TabsContent>
        <TabsContent className='w-screen' value="Projects">
          <ProjectOverView />
        </TabsContent>
        <TabsContent className='w-screen' value="Users">
          <AdminUsers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default memo(AdminiStrativeDashboard);
