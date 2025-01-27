/* eslint-disable react/prop-types */
import { Pencil, SaveAll, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import CustomAvator from "./CustomAvator";

const Task = ({
  val,
  inputUpdate,
  OnEditSave,
  user,
  OnEdit,
  TaskAuthorId,
  onDelete,
  onDragStart,
  onDragEnd,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  // this is use to store the old data in case we cancel the editing then by using this we can restore
  const [oldData, setOldData] = useState(null);

  // this checks that does editing option is canceled or not
  const [isEditCancel, setIsEditCancel] = useState(false);
  const [InputVal, setInputVal] = useState();
  useEffect(() => {
    // when component loads store the data
    setOldData(val);
  }, []);
  useEffect(() => {
    //update the input value
    if (inputUpdate) {
      inputUpdate(InputVal);
    }
  }, [InputVal]);
  return (
    <>
      {isEdit ? (
        <div className="w-full grid grid-cols-4 border rounded-md p-2  bg-slate-100 cursor-move ">
          <div className="col-span-3">
            <Input
              className="w-full h-full bg-white"
              value={val}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </div>
          <div className="col-span-1 flex justify-end pr-10 cursor-pointer space-x-8">
            <X
              onClick={() => {
                // disable the edit option
                setIsEdit(false);

                // if edit is canceled means edit cancel state will true
                setIsEditCancel(true);

                // onCancel restore the oldData
                setInputVal(oldData);
              }}
            />

            {val !== oldData && (
              <SaveAll
                onClick={() => {
                  // on save is edit will be false
                  setIsEditCancel(false);
                  // hide the input filed
                  setIsEdit(false);
                  // sends the save Data to parent

                  val !== oldData && OnEditSave(val);

                  // and set Old data to saved data
                  setOldData(val);
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className="w-full grid grid-cols-4 border rounded-md p-2 items-center bg-slate-100 cursor-move "
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className="col-span-3 flex h-full items-center pl-4">
            <CustomAvator user={user} />
            <div className="w-full flex items-center h-10">
              {isEditCancel ? val : oldData}
            </div>
          </div>
          {JSON.parse(localStorage.getItem("user"))._id == TaskAuthorId && (
            <div className="col-span-1 flex justify-end pr-10 cursor-pointer space-x-8">
              <Trash2
                className="hover:text-red-600"
                onClick={() => {
                  onDelete();
                }}
              />

              <Pencil
                className="hover:text-blue-600"
                onClick={() => {
                  setIsEdit(true);
                  OnEdit();
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Task;
