import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import AddProject from "../Popups/AddProject";
import AvatarGroup from "./AvatarGroup";

const ProjectOverView = () => {
  const [Title, setTitle] = useState("")
  const ComponentArr = [
    {
      title: "addProject",
      comp: <AddProject title="Add New Project" onCancel={() => setTitle("")} />
    },
    {
      title: "updateProject",
      comp: <AddProject title="Updated The Project" onCancel={() => setTitle("")} isToUpdate={true} />
    }
  ]

  const ReturnComponent = (givenTitle) => {
    let Component = ComponentArr.find((ele) => ele.title === givenTitle)
    if (!Component) {
      return <></>
    }
    else {
      return Component.comp
    }
  }

  const Projects = [
    {
      id: 1,
      name: "Ems Project",
      ActiveUsers: ["sandeep", "amir", "anil", "abhishek", "anurag"],
      Task: 87,
      status: "pending",
    },
    {
      id: 2,
      name: "Java Spring",
      ActiveUsers: ["sandeep", "amir"],
      Task: 11,
      status: "active",
    },
    {
      id: 3,
      name: "Facebook Clone",
      ActiveUsers: ["sandeep", "amir", "anil", "abhishek", "anurag", "sunil"],
      Task: 50,
      status: "pending",
    },
    {
      id: 4,
      name: "Ems Project",
      ActiveUsers: [
        "sandeep",
        "amir",
        "anil",
        "abhishek",
        "anurag",
        "jone doe",
        "harry",
      ],
      Task: 87,
      status: "pending",
    },
  ];


  return (
    <div className="w-[95%]">
      <div className="table h-[60vh]  w-full overflow-x-scroll bg-slate-50">
        <Table>
          <TableCaption>A list of all Available Projects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S .No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>ActiveUsers</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
              <TableHead className="flex justify-center items-center">
                View Project
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Projects.map((ele) => {
              return (
                <TableRow key={ele.id} className="hover:bg-slate-200">
                  <TableCell>{ele.id}</TableCell>
                  <TableCell className="font-medium text-base">
                    {ele?.name}
                  </TableCell>
                  <TableCell className="font-medium text-base">
                    <AvatarGroup users={ele?.ActiveUsers} />
                  </TableCell>
                  <TableCell className="font-medium text-base">
                    {ele?.Task}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ele?.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button className="mt-3 w-24 h-8 rounded-sm shadow-md bg-blue-400 hover:bg-blue-500" onClick={() => {
                      setTitle("updateProject")
                    }}>Updated</Button>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Button variant="link" className=" w-32 text-blue-500">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* add task Button */}
      <Button className="mt-3 w-24 h-8 rounded-sm shadow-md bg-blue-500 hover:bg-blue-600" onClick={() => {
        setTitle("addProject")
      }}>Add Project</Button>

      {/* popups */}
      {
        ReturnComponent(Title)
      }

    </div>
  );
};
export default ProjectOverView;
