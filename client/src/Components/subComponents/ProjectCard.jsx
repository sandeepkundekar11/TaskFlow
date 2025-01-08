/* eslint-disable react/prop-types */
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import AvatarGroup from "./AvatarGroup";
const ProjectCard = ({ info }) => {
  const { projectName, description, users } = info;
  return (
    <Card className="p-4 flex justify-between items-center mt-2">
      <div className="">
        <h1 className="text-lg font-semibold">{projectName}</h1>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <Button className="mt-2">View Project</Button>
      </div>
      <div className=" h-full flex items-center">
        <AvatarGroup users={users} />
      </div>
    </Card>
  );
};
export default ProjectCard;
