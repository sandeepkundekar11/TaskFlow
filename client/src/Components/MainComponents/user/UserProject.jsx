import CreateSprint from "@/Components/subComponents/CreateSprintPage";
import ProjectStatus from "@/Components/subComponents/ProjectStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProject = () => {
  return (
    <div className="pt-20 w-[95%] m-auto overflow-x-hidden">
      <Tabs defaultValue="Project" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Project" className="w-52">
            Project
          </TabsTrigger>
          <TabsTrigger value="backlogs" className="w-52">
            Backlogs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Project" className="w-[95vw]">
          <ProjectStatus />
        </TabsContent>
        <TabsContent value="backlogs" className="w-[95vw]">
          <CreateSprint />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default UserProject;
