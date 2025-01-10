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
  return (
    <div className="w-full p-4">
      <Card className="w-[95%]  h-auto">
        <h1></h1>
        <CardHeader>
          <h1 className="text-2xl font-semibold">QuizMaster</h1>
          <p className="text-base mt-2 text-gray-600">
            An advanced quiz application for educational institutions.
          </p>
        </CardHeader>
        <CardContent>
          {/*create sprint section  */}
          <Card className="w-full min-h-24 bg-white">
            <CardHeader>
              <div>
                <h1>Sprint 1</h1>
                <button></button>
              </div>
              <CardTitle className="text-xl">Sprint 1</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <div className="w-full flex justify-end mt-2">
            <Button className="w-32" variant="outline">
              Create Sprint
            </Button>
          </div>
          {/* create Tasks section */}
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
                      draggable={true}
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
