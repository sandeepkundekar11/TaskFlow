/* eslint-disable react/prop-types */
import { Pencil, SaveAll, Trash2, X } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"

const Task = ({ val, inputUpdate }) => {
    const [isEdit, setIsEdit] = useState(false)
    return (
        <>
            {
                isEdit ? <div
                    className="w-full grid grid-cols-4 border rounded-md p-2  bg-slate-100 cursor-move ">
                    <div className="col-span-3">
                        <Input className="w-full h-full bg-white" value={val} onChange={(e) => inputUpdate(e.target.value)} />
                    </div>
                    <div className="col-span-1 flex justify-end pr-10 cursor-pointer space-x-8">
                        <X onClick={() => setIsEdit(false)} />
                        <SaveAll onClick={() => setIsEdit(false)} />
                    </div>
                </div> : <div
                    className="w-full grid grid-cols-4 border rounded-md p-2  bg-slate-100 cursor-move ">
                    <div className="col-span-3">{val}</div>
                    <div className="col-span-1 flex justify-end pr-10 cursor-pointer space-x-8">
                        <Trash2 className="hover:text-red-600" />
                        <Pencil className="hover:text-blue-600" onClick={() => setIsEdit(true)} />
                    </div>
                </div>
            }

        </>
    )
}
export default Task