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
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProject from "../Popups/AddProject";
import AvatarGroup from "./AvatarGroup";
import useGetApi from "@/CustomHooks/useGetApi";
import { BASE_URL } from "@/constants";
import usePutApi from "@/CustomHooks/usePutApi";

const ProjectOverView = () => {
  const Navigate = useNavigate();
  const [Title, setTitle] = useState("");
  // calling the get all project api
  const [AllProjects, setAllProjects] = useState([]);

  // calling get api
  const {
    data: AllTheProjects,
    loading: AllProjectLoading,
    callApi: GetAllProjects,
  } = useGetApi(`${BASE_URL}/admin/getProjects`);

  // calling get All userApi
  const { data: AllUsers, callApi: GetAllUser } = useGetApi(
    `${BASE_URL}/admin/getuser`
  );

  // calling Add Project Api
  const {
    data: AddProjectInfo,
    loading: AddProjectLoading,
    callApi: AddNewProject,
  } = usePutApi(`${BASE_URL}/admin/createProject`);

  useEffect(() => {
    GetAllProjects();
    GetAllUser();
    setTitle(""); // removes the popup
  }, [AddProjectInfo]);

  // upading the Users
  const UserToAdd = useMemo(() => {
    if (AllUsers?.users) {
      let UpdateUser = AllUsers?.users?.map((userObj) => {
        return { value: userObj?.email, label: userObj?.email };
      });
      return UpdateUser;
    }
  }, [AllUsers]);

  // Updating the Projects
  useEffect(() => {
    let updatedProject = AllTheProjects?.projects.map((project) => {
      return {
        name: project?.name,
        ActiveUsers: project?.users?.map((user) => user?.name),
        Task: project?.tasks?.length,
        status: project?.status,
        id: project?._id,
      };
    });
    setAllProjects(updatedProject);
  }, [AllTheProjects]);

  const ComponentArr = [
    {
      title: "addProject",
      comp: (
        <AddProject
          title="Add New Project"
          users={UserToAdd}
          onSave={(info) => AddNewProject(info)}
          onCancel={() => setTitle("")}
          loading={AddProjectLoading}
        />
      ),
    },
    {
      title: "updateProject",
      comp: (
        <AddProject
          title="Updated The Project"
          onCancel={() => setTitle("")}
          isToUpdate={true}
        />
      ),
    },
  ];

  const ReturnComponent = (givenTitle) => {
    let Component = ComponentArr.find((ele) => ele.title === givenTitle);
    if (!Component) {
      return <></>;
    } else {
      return Component.comp;
    }
  };

  return (
    <div className="w-[85%]">
      <div className="table h-[60vh]  w-full overflow-x-scroll">
        {/* add task Button */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-gray-600 text-2xl">Projects</h1>
          <Button
            className="mt-3 w-28 h-8 rounded-sm shadow-md bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setTitle("addProject");
            }}
          >
            + Add Project
          </Button>
        </div>
        <Table className="mt-2">
          <TableCaption>A list of all Available Projects</TableCaption>
          <TableHeader className="bg-slate-200">
            <TableRow>
              <TableHead className="w-[100px]">S .No</TableHead>
              <TableHead>TITLE</TableHead>
              <TableHead>ACTIVE USERS</TableHead>
              <TableHead>TASK</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead></TableHead>
              <TableHead className="flex justify-center items-center">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllProjectLoading ? (
              <p>Loading....</p>
            ) : (
              AllProjects?.map((ele, index) => {
                return (
                  <TableRow key={index} className="hover:bg-slate-200">
                    <TableCell>{index + 1}</TableCell>
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
                      <div className="w-20 h-8 rounded-md  px-2 py-1">
                        {ele?.status === "in-active" ? (
                          <p className="bg-yellow-300 text-yellow-950 w-full h-full flex justify-center items-center rounded-lg">
                            {ele?.status}
                          </p>
                        ) : (
                          <p className="bg-green-400 text-green-900 flex justify-center items-center h-full w-full rounded-lg">
                            {ele?.status}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        className="mt-3 w-24 h-8 rounded-sm shadow-md bg-blue-400 hover:bg-blue-500"
                        onClick={() => {
                          setTitle("updateProject");
                        }}
                      >
                        Updated
                      </Button>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Button
                        variant="link"
                        className=" w-32 text-blue-500"
                        onClick={() => {
                          Navigate(`${ele?.id}/view`);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* popups */}
      {ReturnComponent(Title)}
    </div>
  );
};
export default ProjectOverView;
