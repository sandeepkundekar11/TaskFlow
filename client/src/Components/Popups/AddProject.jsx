/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "../ui/button";

import Popup from "./Popup";
// eslint-disable-next-line react/prop-types
const AddProject = ({
  title,
  onCancel,
  onSave,
  loading = false,
  users = [],
  updateData,
  isToUpdate = false,
}) => {
  const [selectedUsers, setSelectedUsers] = useState(
    updateData && updateData?.users
  );
  // project Data
  const [ProjectData, setProjectData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    console.log(updateData);
    if (updateData) {
      setProjectData((prev) => ({
        ...prev,
        name: updateData.name,
        description: updateData.description,
        startTime: updateData.startTime?.split("T")[0],
        endTime: updateData.endTime?.split("T")[0],
      }));

      console.log(updateData?.users);
      setSelectedUsers(updateData?.users || []);
    }
  }, [updateData]);

  // warnings
  const [ProjectDataWarnings, setProjectDataWarnings] = useState({
    nameWarnings: "",
    descriptionWarnings: "",
    startTimeWarnings: "",
    endTimeWarnings: "",
    usersWarnings: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const onsubmitProject = () => {
    let newWarnings = {
      nameWarnings: "",
      descriptionWarnings: "",
      startTimeWarnings: "",
      endTimeWarnings: "",
      usersWarnings: "",
    };

    // name
    if (ProjectData.name.length < 5) {
      newWarnings.nameWarnings = "Project name can't be less then 5 characters";
    } else {
      newWarnings.nameWarnings = "";
    }

    // description
    if (ProjectData.description.length < 10) {
      newWarnings.descriptionWarnings =
        "Project Descriptin can't be less then 10 characters";
    } else {
      newWarnings.descriptionWarnings = "";
    }

    // let givenDate=Date.now(ProjectData.startTime)
    // let presentDate=Date.now()
    // start  Date validation
    if (!ProjectData.startTime) {
      newWarnings.startTimeWarnings =
        "Project start date has not been mentioned";
    } else if (
      Date.now() > new Date(ProjectData.startTime).getTime() &&
      !isToUpdate
    ) {
      newWarnings.startTimeWarnings =
        "Project start date can't be less than today's date";
    } else {
      newWarnings.startTimeWarnings = "";
    }

    //  end Date validation
    if (!ProjectData.endTime) {
      newWarnings.endTimeWarnings = "Project end date has not mentioned";
    } else if (
      new Date(ProjectData.startTime).getTime() >
        new Date(ProjectData.endTime).getTime() &&
      !isToUpdate
    ) {
      newWarnings.endTimeWarnings =
        "Project end date can't be less then project start date";
    } else {
      newWarnings.endTimeWarnings = "";
    }

    setProjectDataWarnings(newWarnings);
    // updating the users arr
    if (Object.values(newWarnings).every((val) => val === "")) {
      let updateUser = selectedUsers?.map((user) => {
        return user?.value;
      });
      onSave({ ...ProjectData, users: updateUser });
    }
  };
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
                name="name"
                value={ProjectData.name}
                onChange={onInputChange}
              />
              <p className="font-semibold text-sm text-red-700">
                {ProjectDataWarnings.nameWarnings}
              </p>
            </div>
            <div className="grid w-full  items-center gap-1.5 mt-4">
              <Label htmlFor="Discription">Project Discription</Label>
              <Textarea
                placeholder="Enter project Discription"
                className="min-h-24 max-h-36 bg-white"
                name="description"
                value={ProjectData.description}
                onChange={onInputChange}
              />
              <p className="font-semibold text-sm text-red-700">
                {ProjectDataWarnings.descriptionWarnings}
              </p>
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
                name="startTime"
                value={ProjectData.startTime}
                onChange={onInputChange}
              />
              <p className="font-semibold text-sm text-red-700">
                {ProjectDataWarnings.startTimeWarnings}
              </p>
            </div>
            <div className="grid  items-center gap-1.5 mt-4">
              <Label htmlFor="ProjectEndData">Project End Date</Label>
              <Input
                type="date"
                id="date"
                className="w-full bg-white"
                placeholder="Project Start Date"
                name="endTime"
                value={ProjectData.endTime}
                onChange={onInputChange}
              />
              <p className="font-semibold text-sm text-red-700">
                {ProjectDataWarnings.endTimeWarnings}
              </p>
            </div>
          </div>

          {/*  */}
          <div className="grid w-full  items-center gap-1.5 mt-4">
            <Label htmlFor="SelectUser">Select Users</Label>
            <Select
              isMulti
              defaultValue={selectedUsers}
              onChange={setSelectedUsers}
              options={users}
            />
            <p className="font-semibold text-sm text-red-700"></p>
          </div>
        </div>
        {/* buttons */}
        <div className="flex space-x-5 mt-8 justify-end">
          <Button
            className="w-32 h-9 text-base bg-blue-500 hover:bg-blue-600 flex justify-center items-center"
            onClick={onsubmitProject}
          >
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-transparent border border-l-2 animate-spin"></div>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            className="w-32 h-9 text-base bg-red-500 hover:bg-red-600"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Popup>
  );
};
export default AddProject;
