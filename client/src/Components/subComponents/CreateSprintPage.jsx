/* eslint-disable no-unsafe-optional-chaining */
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import usePostApi from "@/CustomHooks/usePostApi";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sprint from "./Sprint";
import Task from "./Task";
import useGetApi from "@/CustomHooks/useGetApi";
import usePutApi from "@/CustomHooks/usePutApi";
const CreateSprint = () => {
  // this state is use to show  hide the add Task input filed
  const [ShowCreateTask, setShowCreateTask] = useState(false);

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

  // -------------------------------------------------------------------
  // delete Task api

  const [BackLogsInfo, setBacklogsInfo] = useState();
  useEffect(() => {
    getAllInfo();
  }, []);

  // store the added new Task id
  const [TaskId, setTaskId] = useState(null);
  // setting the Created Task Id
  useEffect(() => {
    setTaskId(newTaskMessage?.TaskId);
  }, [newTaskMessage]);

  // Task
  const [TaskInputField, setTaskInputFiled] = useState({
    _id: "",
    title: "",
    author: "",
  });

  useEffect(() => {
    console.log(BackLogsInfo, "BackLogsInfo");
  }, [BackLogsInfo]);

  // Task update
  const onUpdatetask = (val) => {
    setBacklogsInfo((prevTask) => {
      return {
        ...prevTask,
        backlogs: {
          ...prevTask?.backlogs,
          tasks: prevTask?.backlogs?.tasks.map((task) => {
            if (task?._id === TaskIdToUpdate) {
              return {
                ...task,
                title: val,
              };
            } else {
              return task;
            }
          }),
        },
      };
    });
  };

  // api call
  const onSaveTask = (val) => {
    updateTask({ title: val });
  };

  useEffect(() => {
    // stores all the Backlogs data like sprint info, Tasks
    setBacklogsInfo(allBacklogs);
  }, [allBacklogs]);

  // creating new sprint

  const [Sprints, setSprints] = useState([]);

  // creating new Sprint
  const createSprint = () => {
    setSprints((prev) => {
      return [
        ...prev,
        {
          name: `sprint -${Sprints.length + 1}`,
          tasks: [],
          startTime: "",
          endTime: "",
        },
      ];
    });
  };

  // updating each sprint
  const onInputchange = (filed, newValue, index) => {
    setSprints((NewSprint) => {
      return NewSprint.map((val, sIndex) => {
        if (index === sIndex) {
          return {
            ...val,
            [filed]: newValue,
          };
        } else {
          return val;
        }
      });
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
                sprintName={sprint.name}
                key={index}
                sprint={sprint}
                OnInputChange={(filed, newValue) =>
                  onInputchange(filed, newValue, index)
                }
              />
            );
          })}

          {/* create sprint button */}
          <div className="w-full flex justify-end mt-2">
            <Button className="w-32" variant="outline" onClick={createSprint}>
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
              <div className="space-y-2">
                {BackLogsInfo?.backlogs?.tasks?.map((ele, index) => {
                  return (
                    <Task
                      key={index}
                      val={ele?.title}
                      user={ele?.author?.name}
                      OnEdit={() => {
                        setTaskIdToUpdate(ele?._id);
                        // console.log(ele?._id);
                      }}
                      OnEditSave={(val) => onSaveTask(val)}
                      inputUpdate={(newVal) => onUpdatetask(newVal)}
                      TaskAuthorId={
                        ele?.author?._id ||
                        JSON.parse(localStorage.getItem("user"))._id
                      }
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
                      setTaskInputFiled((prev) => {
                        let userInfo = JSON.parse(localStorage.getItem("user"));
                        let author = {
                          name: userInfo?.name,
                          id: userInfo?._id,
                        };
                        return {
                          ...prev,
                          _id: TaskId,
                          author: author,
                          title: e.target.value,
                        };
                      });
                    }}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-end space-x-6">
              {
                // save Task button
                TaskInputField?.title?.length > 6 && (
                  <Button
                    className="w-32"
                    onClick={() => {
                      setShowCreateTask(false);
                      // api calling
                      CreateNewTask({ title: TaskInputField.title });
                      // updating the Backlog Object
                      setBacklogsInfo((prev) => {
                        return {
                          ...prev,
                          backlogs: {
                            ...prev?.backlogs,
                            tasks: [
                              ...prev?.backlogs?.tasks,
                              {
                                _id: TaskInputField._id,
                                title: TaskInputField.title,
                                author: TaskInputField.author,
                              },
                            ],
                          },
                        };
                      });
                      setTaskInputFiled("");
                    }}
                  >
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
    </div>
  );
};
export default CreateSprint;
