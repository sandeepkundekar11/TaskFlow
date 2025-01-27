/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import Popup from "./Popup";
const AddSubTask = ({ onCancel, onSave, loading, subTask, onSubtaskChange }) => {
  const [Warning, setWarnings] = useState()
  return (
    <Popup>
      <div className="w-[400px] min-h-52 bg-white shadow-lg rounded-md p-3">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Add SubTask</h1>
          <Button variant="outline" className="border-none" onClick={onCancel}>
            <X />
          </Button>
        </div>
        <div className="mt-4">
          <Textarea
            placeholder="Enter SubTask Description."
            className="h-20"
            value={subTask}
            onChange={(e) => onSubtaskChange(e)}
          />
          <p className="text-sm font-bold mt-1 text-red-600">{Warning}</p>
          <div className="w-full mt-4 flex justify-end">
            <Button
              onClick={() => {
                if (subTask.length < 5) {
                  setWarnings("subTask can't be less then 5 characters")
                }
                else {
                  setWarnings("")
                  onSave();
                }

              }}
            >
              {
                loading ? <div className="w-7 h-7  rounded-full bg-transparent border-b-2 border-l-2 animate-spin"></div> : " Add SubTask"
              }

            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default AddSubTask;
