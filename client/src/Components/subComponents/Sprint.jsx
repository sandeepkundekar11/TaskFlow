/* eslint-disable react/prop-types */
import {
    Card,
    CardContent,
    CardHeader
} from "@/Components/ui/card";
import { Button } from "../ui/button";
import Task from "./Task";
const Sprint = ({ SprintTasks = [], sprintName, sprint, OnInputChange ,onDrop,onDragOver}) => {
    return (
        <Card className="w-full min-h-24 bg-white">
            <CardHeader>
                <div>
                    <div className="flex justify-between">
                        <h1 className="font-bold text-xl">{sprintName}</h1>
                        <Button variant="outline" className="bg-slate-100 w-24" onClick={() => console.log(sprint)}>Start Sprint</Button>
                    </div>
                    <div className="grid w-96 grid-cols-2 mt-2">

                        <div className="col-span-1">
                            <label htmlFor="" className="text-sm">Start Date</label>
                            <input type="date" className="border p-1 rounded-md" name="startTime" value={sprint?.startTime} id="" onChange={(e) => OnInputChange("startTime", e.target.value)} />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="">End Date</label>
                            <input type="date" className="border p-1 rounded-md" name="endTime" value={sprint?.endTime} id="" onChange={(e) => OnInputChange("endTime", e.target.value)} />
                        </div>

                    </div>
                </div>
            </CardHeader>
            <CardContent className="bg-slate-50 flex flex-col justify-center items-center min-h-24 max-h-max border-dashed border-2"onDrop={onDrop} onDragOver={onDragOver}>
                {
                    // listing  down the draged task in the sprint
                    SprintTasks.map((task, tindex) => {
                        return (
                             <Task key={tindex} val={task?.title} user={task?.author?.name}/>
                        )
                    })
                }

                {
                    SprintTasks.length === 0 && <p className="text-lg text-slate-700 font-bold ">Plan Your Sprint</p>
                }

            </CardContent>
        </Card>
    )
}
export default Sprint