import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";
const CreateSprint = () => {
  // this state is use to show  hide the add Task input filed
  const [ShowCreateTask, setShowCreateTask] = useState(false);

  // bellow state is use to store the creates task
  const [CreatedTasks, setCreatedTasks] = useState([]);

  const [TaskInputField, setTaskInputFiled] = useState("");





  // creating new sprint

  const [Sprints, setSprints] = useState([])

  const CreateNewSprint = () => {
    setSprints((pre) => {
      return [...pre, {
        sprintName: `sprint-${Sprints.length + 1}`,
        startTime: "",
        endTime: "",
        Task: []
      }]
    })
  }


  // this add the dynamic inputs  of the Sprints arr 
  const HandleSprintInputs = (index, filed, value) => {
    setSprints((prev) => {
      return prev?.map((sp, spIndex) => {
        if (spIndex === index) {
          return {
            ...sp,
            [filed]: value
          }
        }

        else {
          return sp
        }
      })
    })
  }


  // drag and drop logic

  const [DragedTasks, setDragedtask] = useState()


  const onTaskDrop=(currentTarget)=>{
    //  get the value and source
    const {value,source}=DragedTasks

    setSprints((prev)=>{
      return prev.map((sp,spIndex)=>{
        if(spIndex===1)
        {
          return{
            ...sp,
            Task:[]
          }
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
                <Card className="w-full min-h-24 bg-white" key={index}>
                  <CardHeader>
                    <div>
                      <div className="flex justify-between">
                        <h1 className="font-bold text-xl">{sprint.sprintName}</h1>
                        <Button variant="outline" className="bg-slate-100 w-24">Start Sprint</Button>
                      </div>
                      <div className="grid w-96 grid-cols-2 mt-2">

                        <div className="col-span-1">
                          <label htmlFor="" className="text-sm">Start Date</label>
                          <input type="date" className="border p-1 rounded-md" name="" value={sprint?.startTime} id="" onChange={(e) => {
                            HandleSprintInputs(index, "startTime", e.target.value)
                          }} />
                        </div>
                        <div className="col-span-1">
                          <label htmlFor="">End Date</label>
                          <input type="date" className="border p-1 rounded-md" name="" value={sprint?.endTime} id="" onChange={(e) => {
                            HandleSprintInputs(index, "endTime", e.target.value)
                          }} />
                        </div>

                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-slate-50 flex justify-center items-center min-h-24 max-h-max border-dashed border-2" onDragOver={(e)=>{
                    e.preventDefault()
                  }} onDrop={(e)=>onTaskDrop(e.currentTarget)} >
                    {
                      // listing  down the draged task in the sprint
                      sprint?.Task.map((task, tindex) => {
                        return (
                          <div key={tindex} className="w-[90%] h-10">{task}</div>
                        )
                      })
                    }

                    {
                      sprint?.Task.length === 0 && <p className="text-lg text-slate-700 font-bold ">Plan Your Sprint</p>
                    }

                  </CardContent>
                </Card>
              )
            })
          }

          {/* create sprint button */}
          <div className="w-full flex justify-end mt-2">
            <Button className="w-32" variant="outline" onClick={CreateNewSprint}>
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
                    <div
                      key={index}
                      className="w-full grid grid-cols-4 border rounded-md p-2  bg-slate-100 cursor-move "
                      draggable
                      onDragStart={(e) => {
                        e.target.style.opacity = "0.5"
                        setDragedtask({value:ele,source:"CreatedTasks"})
                      }}

                      onDragEnd={(e) => {
                        e.target.style.opacity = "1"
                      }}
                    >
                      <div className="col-span-3">{ele}</div>
                      <div className="col-span-1 flex justify-end pr-10 cursor-pointer">
                        <Trash2 className="hover:text-red-600" />
                      </div>
                    </div>
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
