import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Select from "react-select";
const AddProject = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="w-full h-full">
      <div className="w-full">
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
    </div>
  );
};
export default AddProject;
