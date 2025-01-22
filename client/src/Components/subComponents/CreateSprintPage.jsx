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
import { useState } from "react";
import { useParams } from "react-router-dom";
import Sprint from "./Sprint";
import Task from "./Task";
const CreateSprint = () => {
  // this state is use to show  hide the add Task input filed
  const [ShowCreateTask, setShowCreateTask] = useState(false);
  
  const {projectId}=useParams()
  // bellow state is use to store the creates task
  const [CreatedTasks, setCreatedTasks] = useState([]);

  const [TaskInputField, setTaskInputFiled] = useState("");
  const onUpdatetask = (index, val) => {
    setCreatedTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = val; // Update the specific task at the index
      return updatedTasks; // Return the updated array
    });
  };

  // calling create Task api
  const {callApi:CreateNewTask}=usePostApi(`${BASE_URL}/user/createTask/${projectId}`)
  // get all Task Api
  // const {}=useGetApi(`${BASE_URL}/user/`)




  // creating new sprint

  const [Sprints, setSprints] = useState([])

  // creating new Sprint
  const createSprint = () => {
    setSprints((prev) => {
      return [...prev, {
        name: `sprint -${Sprints.length + 1}`,
        tasks: [],
        startTime: "",
        endTime: ""
      }]
    })
  }


  // updating each sprint
  const onInputchange = (filed, newValue, index) => {
    setSprints((NewSprint) => {
      return NewSprint.map((val, sIndex) => {
        if (index === sIndex) {
          return {
            ...val,
            [filed]: newValue
          }
        }
        else {
          return val
        }
      })
    })
  }

  return (
    <div className="w-full p-4">
      <Card className="w-[95%]  h-auto">
        <CardHeader>
          <h1 className="text-2xl font-semibold">QuizMaster</h1>
          <p className="text-base mt-2 text-gray-600">
            An advanced quiz application for educational institutions.
          </p>
        </CardHeader>
        <CardContent>
          {/*create sprint section  */}

          {
            Sprints?.map((sprint, index) => {
              return (
                <Sprint sprintName={sprint.name} key={index} sprint={sprint} OnInputChange={(filed, newValue) => onInputchange(filed, newValue, index)} />
              )
            })
          }

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
              {CreatedTasks.length === 0 && (
                <p className="text-gray-600">Tasks are not created yet</p>
              )}
              {/* in this block all created Task will come */}
              <div className="space-y-2">
                {CreatedTasks.map((ele, index) => {
                  return (
                    <Task key={index} val={ele} inputUpdate={(newVal) => onUpdatetask(index, newVal)} />
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
                    value={TaskInputField}
                    onChange={(e) => {
                      setTaskInputFiled(e.target.value);
                    }}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-end space-x-6">
              {
                // save Task button
                TaskInputField.length > 6 && (
                  <Button
                    className="w-32"
                    onClick={() => {
                      setShowCreateTask(false);
                      setCreatedTasks((pre) => {
                        return [...pre, TaskInputField];
                      });
                      // api calling
                      CreateNewTask({title:TaskInputField})
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
