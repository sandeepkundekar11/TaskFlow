import { Card, CardContent } from "@/Components/ui/card";
import CustomTaskAccordian from "./CustomAccordian";
import DrgableTaskCard from "./DragebleTaskCard";
import AddSubTask from "../Popups/AddSubTask";
import { useState } from "react";

const ProjectStatus = () => {
  // based on this State we are showing and hidding the Add SubTask Popup
  const [showAddSubTaskPopup, setShowAddTaskPopup] = useState(false);

  const [itesmsm, setItems] = useState({
    Todo: ["Task1", "Task2", "Task3", "Task4", "Task5"],
    InProgress: [],
    Done: [],
  });

  // this state stores the current dragging  element
  const [draggedItem, setDraggedItem] = useState(null);
  //
  const HandleDrop = (e, currentTarget) => {
    // here first we are getting the value and source and "currentTarget" is current position
    const { value, source } = draggedItem;

    // updating the state
    setItems((prev) => {
      //update souces coloum
      let newSource = itesmsm[source].filter((ele) => ele !== value);

      // updating the Target coloum
      let newTarget = [...itesmsm[currentTarget]];
      if (!newTarget.includes(value)) {
        newTarget = [...itesmsm[currentTarget], value];
      }

      return {
        ...prev,
        [source]: newSource,
        [currentTarget]: newTarget,
      };
    });
    setDraggedItem(null);
  };
  return (
    <div className="w-[95%] p-4 overflow-x-hidden">
      <h1 className="text-2xl font-semibold">QuizMaster</h1>
      <p className="text-base mt-2 text-gray-600">
        An advanced quiz application for educational institutions.
      </p>
      <Card className="w-full h-auto mt-2 p-2 shadow-none border-none rounded-none bg-gray-100">
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

          {[1, 2, 3, 4, 5].map((task) => {
            return (
              <CustomTaskAccordian
                onAddTask={() => {
                  setShowAddTaskPopup(true);
                }}
                key={task}
                TaskId={"SP-1"}
                TaskTitle={"this is Task 1 this is Task 1"}
              >
                {/* TODO, InProgress, and Done section */}
                <div className="grid grid-cols-3 space-x-3 w-full">
                  <div className="col-span-1 min-h-96 bg-gray-200">
                    {/* here all TODO Tasks will come */}
                    {itesmsm.Todo.map((item) => {
                      return (
                        <DrgableTaskCard
                          Task={item}
                          key={item}
                          onDragStartFun={(e) => {
                            // when we start dragging perticular element that time we are making its opacity less
                            // and storing its value  and source in one state
                            e.target.style.opacity = "0.4";
                            setDraggedItem({ value: item, source: "Todo" });
                          }}
                          onDragEndFun={(e) => {
                            e.target.style.opacity = "1";
                          }}
                        />
                      );
                    })}
                  </div>
                  <div
                    className="col-span-1 min-h-96 bg-gray-200"
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      // this function will get called when some element drops on this coloum
                      // in this function we are sending the event and current position
                      HandleDrop(e, "InProgress");
                    }}
                  >
                    {/* here all in progress Task will come */}
                    {itesmsm.InProgress.map((item) => {
                      return (
                        <DrgableTaskCard
                          Task={item}
                          key={item}
                          onDragStartFun={(e) => {
                            // when we start dragging perticular element that time we are making its opacity less
                            // and storing its value  and source in one state
                            e.target.style.opacity = "0.4";
                            setDraggedItem({
                              value: item,
                              source: "InProgress",
                            });
                          }}
                          onDragEndFun={(e) => {
                            e.target.style.opacity = "1";
                          }}
                        />
                      );
                    })}
                  </div>
                  <div
                    className="col-span-1 min-h-96 bg-gray-200"
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      // this function will get called when some element drops on this coloum
                      // in this function we are sending the event and current position
                      HandleDrop(e, "Done");
                    }}
                  >
                    {/* here all done Task will come */}
                    {itesmsm.Done.map((task) => {
                      return <DrgableTaskCard Task={task} key={task} />;
                    })}
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
