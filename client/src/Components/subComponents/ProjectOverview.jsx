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
import CustomPopupProvider from "../Popups/PopupProvider";
import AvatarGroup from "./AvatarGroup";
import AddProject from "../Popups/AddProject";
import { useState } from "react";

const ProjectOverView = () => {
  const [isOpen, setIsOpen] = useState(false);
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
                    <CustomPopupProvider
                      buttonName="Edit"
                      Heading={"Update The Project"}
                      HandleSave={() => {
                        setIsOpen(false);
                      }}
                      isOpen={isOpen}
                      seIsOpen={setIsOpen}
                    >
                      <AddProject />
                    </CustomPopupProvider>
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

      {/* <Button className="bg-blue-600 w-40 h-10 hover:bg-blue-500 m-auto">Add Project</Button> */}

      <CustomPopupProvider
        buttonName="Add Project"
        Heading={"Add New Project"}
        HandleSave={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        seIsOpen={setIsOpen}
      >
        <AddProject />
      </CustomPopupProvider>
    </div>
  );
};
export default ProjectOverView;
