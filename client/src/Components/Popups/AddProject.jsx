/* eslint-disable no-unused-vars */
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Select from "react-select";
import { Button } from "../ui/button";

import Popup from "./Popup";
// eslint-disable-next-line react/prop-types
const AddProject = ({ title, onCancel, onSave, isToUpdate = false }) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Popup>
      <div className="w-[800px] h-auto p-4 bg-white rounded-md shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-xl font-medium mb-4 mt-2">{title}</h1>
          </div>
          {/*  */}
          <div>
            <div className="grid w-full items-center gap-1.5  ">
              <Label htmlFor="name">Project Name</Label>
              <Input
                type="text"
                id="projectName"
                placeholder="Enter Project Name"
                className="w-full bg-white"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5 mt-4">
              <Label htmlFor="Discription">Project Discription</Label>
              <Textarea
                placeholder="Enter project Discription"
                className="min-h-24 max-h-36 bg-white"
              />
            </div>
          </div>

          {/* project Start and end Date */}
          <div className="grid w-full  items-center gap-1.5 mt-4 grid-cols-2">
            <div className="grid  items-center gap-1.5 mt-4">
              <Label htmlFor="ProjectStartData">Project Start Date</Label>
              <Input
                type="date"
                id="date"
                className="w-full bg-white"
                placeholder="Project Start Date"
              />
            </div>
            <div className="grid  items-center gap-1.5 mt-4">
              <Label htmlFor="ProjectEndData">Project End Date</Label>
              <Input
                type="date"
                id="date"
                className="w-full bg-white"
                placeholder="Project Start Date"
              />
            </div>
          </div>
          {isToUpdate && (
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox id="terms" className="w-5 h-5 " />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Toggle To Complete The Project
              </label>
            </div>
          )}

          {/*  */}
          <div className="grid w-full  items-center gap-1.5 mt-4">
            <Label htmlFor="SelectUser">Select Users</Label>
            <Select
              isMulti
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>
        {/* buttons */}
        <div className="flex space-x-5 mt-8 justify-end">
          <Button
            className="w-32 h-9 text-base bg-blue-500 hover:bg-blue-600"
            onClick={onSave}
          >
            Save
          </Button>
          <Button
            className="w-32 h-9 text-base bg-red-500 hover:bg-red-600"
            onClick={onCancel}
          >
            Cancel11
          </Button>
        </div>
      </div>
    </Popup>
  );
};
export default AddProject;
