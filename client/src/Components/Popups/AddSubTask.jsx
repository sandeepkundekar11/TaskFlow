/* eslint-disable react/prop-types */
import Popup from "./Popup";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
const AddSubTask = ({ onCancel, onSave }) => {
  const [SubTask, setSubTask] = useState("");
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
            onChange={(e) => {
              setSubTask(e.target.value);
            }}
          />
          <div className="w-full mt-4 flex justify-end">
            <Button
              onClick={() => {
                onSave(SubTask);
              }}
            >
              Send message
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default AddSubTask;
