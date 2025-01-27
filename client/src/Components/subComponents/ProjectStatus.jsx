import { Card, CardContent } from "@/Components/ui/card";
import CustomTaskAccordian from "./CustomAccordian";
import DrgableTaskCard from "./DragebleTaskCard";
import AddSubTask from "../Popups/AddSubTask";
import { useEffect, useState } from "react";
import useGetApi from "@/CustomHooks/useGetApi";
import { BASE_URL } from "@/constants";
import { useParams } from "react-router-dom";

const ProjectStatus = () => {
  // based on this State we are showing and hidding the Add SubTask Popup
  const [showAddSubTaskPopup, setShowAddTaskPopup] = useState(false);

  const { projectId } = useParams();
  const [currentSprintInfo, setCurrentSprintInfo] = useState(null);
  // calling get currunt sprint running api call
  const { callApi: getCurrentSprint, data: currenrSprintData } = useGetApi(
    `${BASE_URL}/user/getRunningSprint/${projectId}`
  );

  useEffect(() => {
    getCurrentSprint();
  }, []);

  // setting the state
  useEffect(() => {
    setCurrentSprintInfo(currenrSprintData?.sprints);
  }, [currenrSprintData]);
  return (
    <div className="w-[95%] p-4 overflow-x-hidden">
      <h1 className="text-2xl font-semibold">
        {currentSprintInfo?.project?.name}
      </h1>
      <p className="text-base mt-2 text-gray-600">
        {currentSprintInfo?.project?.description}
      </p>
      <p className="text-2xl font-semibold text-gray-600 mt-3">
        {currentSprintInfo?.name}
      </p>

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
                  setShowAddTaskPopup(true);
                }}
                key={task}
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
                      return (
                        <DrgableTaskCard
                          key={index}
                          Author={item?.author?.name}
                          title={item?.title}
                          type={item?.status}
                        />
                      );
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

      {showAddSubTaskPopup && (
        // add subTask Popup
        <AddSubTask onCancel={() => setShowAddTaskPopup(false)} />
      )}
    </div>
  );
};
export default ProjectStatus;
