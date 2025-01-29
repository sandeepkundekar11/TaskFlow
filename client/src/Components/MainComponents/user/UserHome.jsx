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
  // stores the user activities
  const [activities, setActivities] = useState([]);
  // pagination object
  const [Pagination, setPagination] = useState({ start: 0, end: 6 })
  // stores all User Projects
  const [userAllProject, setUserAllProjects] = useState([]);
  // calling the get all project Api
  const {
    data: allProjects,
    loading: allProjectLoading,
    callApi: getAllProjects,
  } = useGetApi(`${BASE_URL}/user/projects`);


  useEffect(() => {
    // updating the project
    let updatedProjects = allProjects?.projects?.map((project) => {
      return {
        ...project,
        id: project?._id,
        users: project?.users?.map((user) => user?.name),
      };
    });
    setUserAllProjects(updatedProjects);
  }, [allProjects]);


  // calling the get user activity api
  const { callApi: getAllUserActivity, data: allUserActivity } = useGetApi(`${BASE_URL}/user/userActivities?start=${Pagination?.start}&&endLimit=${Pagination?.end}`)
  useEffect(() => {
    getAllProjects();
    getAllUserActivity()
  }, []);
  useEffect(() => {
    // update user Activity

    if (allUserActivity?.activities)
      setActivities((prev) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        return [...prev, ...allUserActivity?.activities]
      })
  }, [allUserActivity])


  // see more functionality
  const seeMoreTasks = () => {
    setPagination((prev) => {
      return {
        ...prev,
        start: prev.start + 6,
        end: prev.end + 6
      }
    })

    getAllUserActivity()
  }


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
            {activities?.map((activity) => {
              return <ActivityFeedCard key={activity?._id} activity={activity} />;
            })}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full h-10 bg-slate-200 hover:bg-slate-300 text-lg text-black rounded-md"
              onClick={seeMoreTasks}
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
