/* eslint-disable no-unsafe-optional-chaining */
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import useDeleteApi from "@/CustomHooks/useDeleteApi";
import useGetApi from "@/CustomHooks/useGetApi";
import usePostApi from "@/CustomHooks/usePostApi";
import usePutApi from "@/CustomHooks/usePutApi";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeletePopup from "../Popups/DeletePopup";
import SprintUtility from "../Utilities/SprintUtility";
import Sprint from "./Sprint";
import Task from "./Task";
const CreateSprint = () => {
  const { SaveNewTask, UpdatedTask } = SprintUtility();
  // this state is use to show  hide the add Task input filed
  const [ShowCreateTask, setShowCreateTask] = useState(false);
  //show hide delete popup
  const [ShowDeletePopup, setShowDeletePopup] = useState(false);
  //  new Task state
  const [TaskInputField, setTaskInputFiled] = useState({
    _id: "",
    title: "",
    author: "",
    IsInSprint: false,
  });

  // stores all  information of this Page
  const [BackLogsInfo, setBacklogsInfo] = useState();
  // this state stores the id of task to be deleted
  const [TaskIdToDelete, settaskIdToDelete] = useState(null);
  const { projectId } = useParams();

  // stores the Task id to update the Task
  const [TaskIdToUpdate, setTaskIdToUpdate] = useState(null);
  // -----------------------------------------------------------
  // calling create Task api
  const { callApi: CreateNewTask, data: newTaskMessage } = usePostApi(
    `${BASE_URL}/user/createTask/${projectId}`
  );

  // ----------------------------------------------------------------
  // get all Task Api
  const { callApi: getAllInfo, data: allBacklogs } = useGetApi(
    `${BASE_URL}/user/getBacklogs/${projectId}?isStarted=false&&isCompleted=false`
  );

  // ---------------------------------------------------------------
  // update Task Api
  const { callApi: updateTask } = usePutApi(
    `${BASE_URL}/user/updateTask/${projectId}/${TaskIdToUpdate}`
  );

  // api call to Update the Task
  const onSaveTask = (val) => {
    updateTask({ title: val });
  };

  // this function updated the local backlog state
  const onUpdatetask = (val) => {
    setBacklogsInfo((prev) => UpdatedTask(prev, TaskIdToUpdate, val));
  };

  // -------------------------------------------------------------------
  // delete Task api
  const {
    callApi: DeleteTask,
    loading: DeleteTaskLoading,
    data: deleteMessage,
  } = useDeleteApi();

  // when Task gets deleted then remove the popup
  useEffect(() => {
    setShowDeletePopup(false);
  }, [deleteMessage]);

  useEffect(() => {
    getAllInfo();
  }, []);

  // setting the new Task in the backlogs
  useEffect(() => {
    if (newTaskMessage?.TaskId) {
      let newTask = {
        _id: newTaskMessage.TaskId,
        title: TaskInputField.title,
        author: TaskInputField.author,
        IsInSprint: TaskInputField?.IsInSprint,
      };
      setBacklogsInfo((prev) => SaveNewTask(prev, newTask));
      setTaskInputFiled({ _id: "", author: "", title: "" });
    }
  }, [newTaskMessage?.TaskId]);

  // save Task
  const saveTask = useCallback(() => {
    if (TaskInputField.title.length > 6) {
      // save Task Api call
      CreateNewTask({ title: TaskInputField.title });
      setShowCreateTask(false);
    }
  }, [TaskInputField, CreateNewTask]);

  // update the task Input filed
  const UpdateTaskFiled = useCallback(
    (event) => {
      setTaskInputFiled((prev) => {
        let userInfo = JSON.parse(localStorage.getItem("user"));
        let author = {
          name: userInfo?.name,
          id: userInfo?._id,
        };
        return {
          ...prev,
          author: author,
          title: event.target.value,
          IsInSprint: false,
        };
      });
    },
    [TaskInputField]
  );

  // delete Task
  const OnTaskDelete = useCallback(() => {
    // calling Delete Task api
    DeleteTask(`${BASE_URL}/user/deleteTask/${projectId}/${TaskIdToDelete}`);
    //  updating the backlogs
    setBacklogsInfo((prev) => {
      return {
        ...prev,
        backlogs: {
          ...prev?.backlogs,
          tasks: prev.backlogs?.tasks.filter((task) => {
            return task._id !== TaskIdToDelete;
          }),
        },
      };
    });
  }, [DeleteTask, TaskIdToDelete, projectId]);

  useEffect(() => {
    // stores all the Backlogs data like sprint info, Tasks
    setBacklogsInfo(allBacklogs);
  }, [allBacklogs]);

  // spring Logic

  const [SprintId, setSprintId] = useState(null);
  // calling the update Sprint
  const { callApi: UpdateSprint, data: SprintUpdateData } = usePutApi(
    `${BASE_URL}/user/updateSprint/${projectId}/${SprintId}`
  );
  // remove Task Api
  const { callApi: RemoveTaskFromSprint } = useDeleteApi();

  // stores the data which is going to drag
  const [DraggedData, setDraggedData] = useState(null);

  //

  const [DraggedSprintTask, setDraggedSprintTask] = useState(null);
  // stores the Sprint Name in which we are adding the Tasks
  const [SprintNameToUpdated, setSprintNameToupdate] = useState("");
  const OnDragStart = (data) => {
    setDraggedData(data);
  };

  //on drad over on Sprint
  const onDragOver = (e) => {
    e.preventDefault();
  };

  //
  const onDropOnSprint = () => {
    // calling the Update Task api (updating the Task to Sprint)
    UpdateSprint({ Tasks: [DraggedData?._id] });
    // when we drag the Task on Sprint then  update the BacklogsInfo
    setBacklogsInfo((prev) => {
      return {
        ...prev,
        backlogs: {
          ...prev?.backlogs,
          tasks: prev?.backlogs?.tasks.filter((task) => {
            return task?._id !== DraggedData?._id;
          }),
        },
        sprint: prev?.sprint?.map((sp) => {
          if (sp.name === SprintNameToUpdated) {
            return {
              ...sp,
              Tasks: [...sp?.Tasks, DraggedData],
            };
          } else {
            return sp;
          }
        }),
      };
    });
  };

  const dropOnBacklogs = () => {
    RemoveTaskFromSprint(`${BASE_URL}/user/backlogs/${SprintId}`, {
      Tasks: [DraggedSprintTask?._id],
    });
    setBacklogsInfo((prev) => {
      return {
        ...prev,
        backlogs: {
          ...prev?.backlogs,
          tasks: [...prev.backlogs?.tasks, DraggedSprintTask],
        },
        sprint: prev?.sprint?.map((sp) => {
          if (sp.name === SprintNameToUpdated) {
            return {
              ...sp,
              Tasks: sp?.Tasks?.filter((task) => {
                return task?._id !== DraggedSprintTask?._id;
              }),
            };
          }
        }),
      };
    });
  };

  // creating new sprint

  // Create Sprint Api Call
  const { callApi: CreateNewSprint } = usePostApi(
    `${BASE_URL}/user/createSprint/${projectId}`
  );

  // creating new Sprint and update the backlog arr
  const createTheSprint = () => {
    CreateNewSprint({ name: `Sprint-${BackLogsInfo?.sprint.length + 1}` });
    setBacklogsInfo((prev) => {
      return {
        ...prev,
        sprint: [...prev.sprint],
      };
    });
  };

  return (
    <div className="w-full p-4">
      <Card className="w-[95%]  h-auto">
        <CardHeader>
          <h1 className="text-2xl font-semibold">
            {BackLogsInfo?.backlogs?.name}
          </h1>
          <p className="text-base mt-2 text-gray-600">
            {BackLogsInfo?.backlogs?.description}
          </p>
        </CardHeader>
        <CardContent>
          {/*create sprint section  */}

          {BackLogsInfo?.sprint?.map((sprint, index) => {
            return (
              <Sprint
                sprintName={sprint?.name}
                key={index}
                sprint={sprint}
                onDrop={onDropOnSprint && onDropOnSprint}
                onDragOver={(e) => {
                  setSprintId(sprint?._id);
                  setSprintNameToupdate(sprint?.name);
                  onDragOver(e);
                }}
                SprintTasks={
                  BackLogsInfo?.sprint?.find(
                    (val) => val?.name === sprint?.name
                  )?.Tasks
                }
                onSprintDragStart={(data) => {
                  setSprintNameToupdate(sprint?.name);
                  setDraggedSprintTask(data);
                  setSprintId(sprint?._id);
                }}
                // OnInputChange={(filed, newValue) => {}}
              />
            );
          })}

          {/* create sprint button */}
          <div className="w-full flex justify-end mt-2">
            <Button
              className="w-32"
              variant="outline"
              onClick={createTheSprint}
            >
              Create Sprint
            </Button>
          </div>
          {/* create Tasks section --------------------------------------------------------------------------------*/}
          <Card className="w-full min-h-24 bg-white mt-3">
            <CardHeader>
              <CardTitle className="text-xl">Create Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {/* all created stacks will come  here */}
              {BackLogsInfo?.tasks && (
                <p className="text-gray-600">Tasks are not created yet</p>
              )}
              {/* in this block all created Task will come */}
              <div
                className="space-y-2 min-h-48"
                onDragOver={(e) => e.preventDefault()}
                onDrop={dropOnBacklogs && dropOnBacklogs}
              >
                {BackLogsInfo?.backlogs?.tasks?.map((ele, index) => {
                  // mapping all the tasks
                  return (
                    <Task
                      key={index}
                      val={ele?.title}
                      user={ele?.author?.name}
                      OnEdit={() => {
                        setTaskIdToUpdate(ele?._id);
                      }}
                      OnEditSave={(val) => onSaveTask(val)}
                      inputUpdate={(newVal) => onUpdatetask(newVal)}
                      TaskAuthorId={
                        ele?.author?._id ||
                        JSON.parse(localStorage.getItem("user"))._id
                      }
                      onDelete={() => {
                        console.log(ele, "ele?._id");
                        settaskIdToDelete(ele?._id);
                        setShowDeletePopup(true);
                      }}
                      onDragStart={() => OnDragStart(ele)}
                    />
                  );
                })}
              </div>
              {/*  */}
              <div className="mt-4">
                {/* input form to add the Task */}
                {ShowCreateTask && (
                  <Input
                    type="text"
                    placeholder="Enter the Task"
                    value={TaskInputField.title}
                    onChange={(e) => {
                      UpdateTaskFiled(e);
                    }}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-end space-x-6">
              {
                // save Task button
                TaskInputField?.title?.length > 6 && (
                  <Button className="w-32" onClick={saveTask}>
                    Save
                  </Button>
                )
              }
              {/* create new Task button */}
              {!ShowCreateTask ? (
                <Button
                  className="w-32"
                  onClick={() => setShowCreateTask(true)}
                >
                  Create Task
                </Button>
              ) : (
                <Button
                  className="w-32"
                  onClick={() => setShowCreateTask(false)}
                >
                  Cancel
                </Button>
              )}
            </CardFooter>
          </Card>
        </CardContent>
      </Card>

      {/* popups */}
      {ShowDeletePopup && (
        <DeletePopup
          loading={DeleteTaskLoading}
          OnDelete={OnTaskDelete}
          onCancel={() => {
            setShowDeletePopup(false);
          }}
        />
      )}
    </div>
  );
};
export default CreateSprint;
