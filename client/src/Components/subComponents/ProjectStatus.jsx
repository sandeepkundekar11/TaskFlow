import { Card, CardContent } from "@/Components/ui/card";
import useGetApi from "@/CustomHooks/useGetApi";
import usePostApi from "@/CustomHooks/usePostApi";
import { BASE_URL } from "@/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddSubTask from "../Popups/AddSubTask";
import SprintSubTaskUtililty from "../Utilities/SprintSubTaskUtility";
import { Button } from "../ui/button";
import AvatarGroup from "./AvatarGroup";
import CustomTaskAccordian from "./CustomAccordian";
import DrgableTaskCard from "./DragebleTaskCard";
import EmptySprintLoader from "../loaders/EmptySprintLoader";

const ProjectStatus = () => {
  // based on this State we are showing and hidding the Add SubTask Popup
  const [showAddSubTaskPopup, setShowAddTaskPopup] = useState(false);

  const { projectId } = useParams();

  // stores the current sprint all information
  const [currentSprintInfo, setCurrentSprintInfo] = useState(null);

  // get current project info
  const [ProjectInfo, setProjectInfo] = useState();

  // calling the api to get all project info
  const { callApi: getProjectInfo, data: projectData } = useGetApi(
    `${BASE_URL}/user/projectAndCompletedSprint/${projectId}`
  );
  useEffect(() => {
    setProjectInfo(projectData);
  }, [projectData]);

  // calling get current sprint running api call
  const {
    callApi: getCurrentSprint,
    data: currenrSprintData,
    loading: currentSprintLoading,
  } = useGetApi(`${BASE_URL}/user/getRunningSprint/${projectId}`);

  useEffect(() => {
    getCurrentSprint();
    getProjectInfo();
  }, []);

  // setting the state
  useEffect(() => {
    setCurrentSprintInfo(currenrSprintData?.sprints);
  }, [currenrSprintData]);

  // logic
  const { updateCurrentSprintAndAddSubTask } = SprintSubTaskUtililty();

  // stores the selected Task id in which we will be creating the subtasks
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  //  add subtask api call
  const {
    callApi: addSubTask,
    data: addSubTaskMessage,
    loading: addSubtaskLoading,
  } = usePostApi(
    `${BASE_URL}/user/createSubTask/${projectId}/${selectedTaskId}`
  );

  // subTask
  const [SubTask, setSubTask] = useState();
  // updating the currentSprintInfo
  useEffect(() => {
    // getting author info from localstorage
    let user = JSON.parse(localStorage.getItem("user"));
    // create new Task
    let newSubTask = {
      _id: addSubTaskMessage?.subTaskId,
      title: SubTask,
      author: {
        _id: user?._id,
        name: user?.name,
        id: user?._id,
      },
      status: "todo",
    };
    // update the CurrentSprintInfo
    setCurrentSprintInfo((prev) =>
      updateCurrentSprintAndAddSubTask(prev, selectedTaskId, newSubTask)
    );

    // after setting the subtask null the subTask
    setSubTask("");

    // remove the popup
    setShowAddTaskPopup(false);
  }, [addSubTaskMessage?.subTaskId]);
  const onAddSubTask = () => {
    addSubTask({ title: SubTask });
  };
  return (
    <div className="w-[95%] p-4 overflow-x-hidden">
      <h1 className="text-2xl font-semibold">
        {ProjectInfo?.projectInfo?.name}
      </h1>
      <p className="text-base mt-2 text-gray-600">
        {ProjectInfo?.projectInfo?.description}
      </p>

      <div className="border-b mt-3 pb-4">
        {ProjectInfo?.sprint?.map((data, index) => {
          return (
            <div
              className="h-14 p-2 border rounded-sm w-full grid grid-cols-3  items-center"
              key={index}
            >
              <h1 className="text-lg font-bold col-span-1">{data?.name}</h1>
              {/*  */}
              <div className="col-span-1 flex items-center h-full">
                <AvatarGroup
                  users={ProjectInfo?.projectInfo?.users?.map(
                    (user) => user.name
                  )}
                />
              </div>
              {/*  */}
              <div className="col-span-1 flex justify-end">
                <Button
                  variant="outline"
                  className=" font-semibold text-gray-600 w-28 text-center rounded-xl hover:bg-white cursor-not-allowed"
                >
                  Completed
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {!currenrSprintData?.sprints ? (
        <div className="w-full h-20 flex justify-center items-center">
          <h1 className="text-2xl font-semibold text-gray-600">
            Currently Sprint is Running
          </h1>
        </div>
      ) : (
        <>
          {currentSprintLoading ? (
            <EmptySprintLoader />
          ) : (
            <>
              <div className="flex justify-between items-center w-full">
                <p className="text-2xl font-semibold text-gray-600 mt-3">
                  {currentSprintInfo?.name}
                </p>
                <Button>Complete Sprint</Button>
              </div>
              <Card className="w-full h-auto mt-4 p-2 shadow-none border-none rounded-none bg-gray-100">
                <CardContent>
                  <ul className="w-full flex space-x-3 h-10  ">
                    {/* Todo */}
                    <li className="w-1/3 font-bold text-base text-center bg-blue-100 flex items-center justify-center text-gray-600  px-2">
                      TODO
                    </li>

                    {/* InProgress */}
                    <li className="w-1/3 font-bold text-base text-center bg-blue-100 flex items-center justify-center text-gray-600">
                      IN PROGRESS
                    </li>
                    {/* Done */}
                    <li className="w-1/3 font-bold text-base text-center bg-blue-100 flex items-center justify-center text-gray-600">
                      DONE
                    </li>
                  </ul>

                  {/* Here Main Task will come */}

                  {currentSprintInfo?.Tasks?.map((task) => {
                    return (
                      <CustomTaskAccordian
                        onAddTask={() => {
                          setSelectedTaskId(task?._id);
                          console.log(task?._id, "id");
                          setShowAddTaskPopup(true);
                        }}
                        key={task?._id}
                        TaskId={task?.taskCode}
                        TaskTitle={task?.title}
                        Author={task?.author?.name}
                      >
                        {/* TODO, InProgress, and Done section */}
                        <div className="grid grid-cols-3 space-x-3 w-full">
                          {/* TODO part */}
                          <div className="col-span-1 min-h-96 bg-gray-200">
                            {/* here all TODO Tasks will come */}
                            {task?.subTasks?.map((item, index) => {
                              if (item?.status === "todo") {
                                return (
                                  <DrgableTaskCard
                                    key={index}
                                    Author={item?.author?.name}
                                    title={item?.title}
                                    type={item?.status}
                                  />
                                );
                              }
                            })}
                          </div>

                          {/* inProgress part */}
                          <div className="col-span-1 min-h-96 bg-gray-200">
                            {/* here all in progress Task will come */}
                            {/* {task?.subTasks?.map((item) => {
                      return <DrgableTaskCard Task={item} key={item} />;
                    })} */}
                          </div>

                          {/* done part */}
                          <div className="col-span-1 min-h-96 bg-gray-200">
                            {/* here all done Task will come */}
                            {/* {task?.subTasks?.map((task) => {
                      return <DrgableTaskCard Task={task} key={task} />;
                    })} */}
                          </div>
                        </div>
                      </CustomTaskAccordian>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}

      {showAddSubTaskPopup && (
        // add subTask Popup
        <AddSubTask
          onCancel={() => setShowAddTaskPopup(false)}
          onSave={onAddSubTask}
          loading={addSubtaskLoading}
          subTask={SubTask}
          onSubtaskChange={(e) => setSubTask(e.target.value)}
        />
      )}
    </div>
  );
};
export default ProjectStatus;
