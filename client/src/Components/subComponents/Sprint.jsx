/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { BASE_URL } from "@/constants";
import usePutApi from "@/CustomHooks/usePutApi";
import { PencilIcon, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Task from "./Task";
const Sprint = ({
  SprintTasks = [],
  sprintName,
  sprint,
  OnInputChange,
  onDrop,
  onDragOver,
  onSprintDragStart,
  onUpdateTime,
  projectId,
  onSprintStart,
}) => {
  // this state show hide the edit and save button
  const [EditEnable, setEditEnable] = useState(false);
  // bellow state stores the dates
  const [Dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  // for dates warnings
  const [Warning, setWarning] = useState("");

  // when the start and end changes in the parent component then change the local state
  useEffect(() => {
    if (sprint?.startDate && sprint?.endDate) {
      setDates({
        ...Dates,
        startDate: sprint?.startDate?.split("T")[0],
        endDate: sprint?.endDate?.split("T")[0],
      });
    }
  }, [sprint?.startDate, sprint?.endDate]);

  // start sprint api call
  const { callApi: StartSprint, data: SprintStartMessage } = usePutApi(
    `${BASE_URL}/user/updateSprint/${projectId}/${sprint?._id}`
  );
  return (
    <Card className="w-full min-h-24 bg-white">
      <CardHeader>
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">{sprintName}</h1>
            <Button
              variant="outline"
              className="bg-slate-100 w-24"
              onClick={() => {
                StartSprint({ isStartSprint: true });
                onSprintStart(SprintStartMessage.message);
              }}
            >
              Start Sprint
            </Button>
          </div>

          {EditEnable ? (
            <div className="grid w-[800px] grid-cols-3 items-center mt-2">
              <div className="col-span-1">
                <p className="text-sm">Start Date</p>
                <input
                  type="date"
                  className="border p-1 rounded-md"
                  name="startTime"
                  value={Dates?.startDate}
                  id=""
                  onChange={(e) => {
                    e.preventDefault();
                    setDates({
                      ...Dates,
                      startDate: e.target.value,
                    });
                    OnInputChange("startDate", e.target.value);
                  }}
                />
              </div>
              <div className="col-span-1">
                <p>End Date</p>
                <input
                  type="date"
                  className="border p-1 rounded-md"
                  name="endDate"
                  value={Dates.endDate}
                  id=""
                  onChange={(e) => {
                    e.preventDefault();
                    setDates({
                      ...Dates,
                      endDate: e.target.value,
                    });
                    OnInputChange("endDate", e.target.value);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className=" w-[800px]   grid grid-cols-3">
              <div className="col-span-1">
                <p className="text-base font-semibold text-gray-800">
                  StartDate
                </p>
                <p className="text-gray-500 text-sm">
                  {Dates?.startDate ? (
                    Dates?.startDate
                  ) : (
                    <p>Start Date Has Not Selected</p>
                  )}
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-base font-semibold text-gray-800">EndDate</p>
                <p className="text-gray-500 text-sm">
                  {Dates.endDate ? (
                    Dates.endDate
                  ) : (
                    <p>End Date Has Not Selected</p>
                  )}
                </p>
              </div>
            </div>
          )}

          {EditEnable ? (
            <>
              <div className="space-x-4">
                {/*  save button */}
                <Button
                  variant="outline"
                  className="w-16 mt-4"
                  onClick={() => {
                    if (!Dates.startDate || !Dates.endDate) {
                      // when we have not selected the dates and  click on save button the throw warnings
                      setWarning("Update the Time");
                    } else {
                      // when we provide the dates then remove the warnings
                      setWarning("");
                      // this function sends the date to parent component on save
                      onUpdateTime(Dates.startDate, Dates.endDate);
                      // then  hide the save button
                      setEditEnable(!EditEnable);
                    }
                  }}
                >
                  <div className="flex  items-center">
                    <Save />
                    <p className="ml-2 font-medium">Save</p>
                  </div>
                </Button>
                {/* cancel button */}
                <Button
                  variant="outline"
                  className="w-8 mt-4"
                  onClick={() => {
                    // when we click on cancel button then we are

                    // and hiding the cancel button
                    setEditEnable(false);
                    // nulling the dates
                    // setDates({ startDate: "", endDate: "" })
                    // removing the warnings
                    setWarning("");
                  }}
                >
                  <X />
                </Button>
              </div>
              <p className="font-semibold text-sm text-red-700">{Warning}</p>
            </>
          ) : (
            <Button
              variant="outline"
              className="w-8 mt-4"
              onClick={() => setEditEnable(!EditEnable)}
            >
              <PencilIcon />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent
        className="bg-slate-50 flex flex-col justify-center w-full space-y-3 items-center min-h-24 max-h-max border-dashed border-2"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {
          // listing  down the draged task in the sprint
          SprintTasks.map((task, tindex) => {
            return (
              <Task
                key={tindex}
                val={task?.title}
                user={task?.author?.name}
                onDragStart={() => onSprintDragStart(task)}
              />
            );
          })
        }

        {SprintTasks.length === 0 && (
          <p className="text-lg text-slate-700 font-bold ">Plan Your Sprint</p>
        )}
      </CardContent>
    </Card>
  );
};
export default Sprint;
