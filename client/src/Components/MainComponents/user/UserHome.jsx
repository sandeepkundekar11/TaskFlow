import ActivityFeedCard from "@/Components/subComponents/ActivityFeedCard";
import ProjectCard from "@/Components/subComponents/ProjectCard";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/Components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BASE_URL } from "@/constants";
import useGetApi from "@/CustomHooks/useGetApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);
  const [userAllProject, setUserAllProjects] = useState([]);
  // calling the get all project Api
  const {
    data: allProjects,
    loading: allProjectLoading,
    callApi: getAllProjects,
  } = useGetApi(`${BASE_URL}/user/projects`);

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    let updatedProjects = allProjects?.projects?.map((project) => {
      return {
        ...project,
        id: project?._id,
        users: project?.users?.map((user) => user?.name),
      };
    });
    setUserAllProjects(updatedProjects);
  }, [allProjects]);

  const activitis = [
    {
      id: "1",
      user: "John Doe",
      action: "created",
      task: "Implement user authentication",
      timestamp: "2023-05-10T09:00:00Z",
    },
    {
      id: "2",
      user: "Jane Smith",
      action: "commented",
      task: "Design new landing page",
      timestamp: "2023-05-10T10:30:00Z",
    },
    {
      id: "3",
      user: "Mike Johnson",
      action: "updated",
      task: "Fix bug in payment gateway",
      timestamp: "2023-05-10T11:45:00Z",
    },
    {
      id: "4",
      user: "Sarah Williams",
      action: "completed",
      task: "Write API documentation",
      timestamp: "2023-05-10T14:15:00Z",
    },
    {
      id: "5",
      user: "John Doe",
      action: "assigned",
      task: "Optimize database queries",
      timestamp: "2023-05-10T16:00:00Z",
    },
    {
      id: "3",
      user: "Mike Johnson",
      action: "updated",
      task: "Fix bug in payment gateway",
      timestamp: "2023-05-10T11:45:00Z",
    },
    {
      id: "4",
      user: "Sarah Williams",
      action: "completed",
      task: "Write API documentation",
      timestamp: "2023-05-10T14:15:00Z",
    },
    {
      id: "5",
      user: "John Doe",
      action: "assigned",
      task: "Optimize database queries",
      timestamp: "2023-05-10T16:00:00Z",
    },
  ];

  useEffect(() => {
    setActivity(activitis.slice(0, 5));
  }, []);

  //   expands the activities section
  const ExpandActivity = () => {
    // here we will be calling api
    let count = activity.length;
    if (activity.length < activitis.length) {
      setActivity(activitis.slice(0, count + 5));
    }
  };
  return (
    <div className="w-screen h-screen bg-slate-50 overflow-x-hidden">
      <div className=" h-auto pt-20 grid md:grid-cols-8 grid-cols-5 w-[95%] m-auto md:space-x-4 ">
        {/* displays all projects assigned to user */}
        <Card className="md:col-span-5 col-span-7 rounded-none max-h-[650px]">
          <CardHeader>
            <h1 className="text-xl font-bold">Your projects</h1>
            <p className="text-lg text-gray-500">
              Projects you are currently involved in
            </p>
          </CardHeader>

          <CardContent className="">
            <ScrollArea className="h-[500px] w-full rounded-md  p-4 border">
              {/* mapping the Projects */}

              {allProjectLoading ? (
                <div>Loading....</div>
              ) : (
                userAllProject?.map((project, index) => {
                  return (
                    <ProjectCard
                      key={index}
                      info={project}
                      onView={() => navigate(`${project.id}/project`)}
                    />
                  );
                })
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        {/* displays all user activities */}
        <Card className="md:col-span-3 col-span-4 h-auto rounded-none">
          <CardHeader>
            <h1 className="text-xl font-bold">Recent Activity Feed</h1>
            <p className="text-lg text-gray-500">Your recent project logins</p>
          </CardHeader>
          <CardContent className="">
            {/* mapping the user activity */}
            {activity.map((activity) => {
              return <ActivityFeedCard key={activity.id} activity={activity} />;
            })}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full h-10 bg-slate-200 hover:bg-slate-300 text-lg text-black rounded-md"
              onClick={ExpandActivity}
            >
              see more..
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default UserHome;
