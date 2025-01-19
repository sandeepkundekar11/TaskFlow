/* eslint-disable no-unused-vars */
import useGetApi from "@/CustomHooks/useGetApi";
import usePostApi from "@/CustomHooks/usePostApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserPopup from "../Popups/AddUserPopup";
import { Button } from "../ui/button";
import ToolTipButton from "./TooltipButton";

const AdminUsers = () => {
  const Navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [AllUsersWithTasks, SetAllUsersWithTasks] = useState()
  const { data: allUserData, loading: getAllUserLoading, callApi: callGetAllUser } = useGetApi(`${BASE_URL}/admin/getUserWithTaskCount`)
  const { data: addUserInfo, loading: addUserLoading, callApi: calAddUserApi } = usePostApi(`${BASE_URL}/admin/addUser`)

  useEffect(() => {
    callGetAllUser()
    setShowPopup(false)
  }, [addUserInfo])


  useEffect(() => {
    SetAllUsersWithTasks(allUserData?.users)
  }, [allUserData])

  return (
    <div className="w-[85%]">
      <div className="table h-[60vh]  w-full overflow-x-scroll">
        {/* add user button */}

        <div className="w-full flex justify-end">
          <Button
            className="mt-3 w-32 h-8 rounded-sm shadow-md bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            + Add New User
          </Button>
        </div>
        <Table className="mt-3">
          <TableCaption>A list of your All Users</TableCaption>
          <TableHeader className="bg-slate-200">
            <TableRow>
              <TableHead className="w-[100px]">S .No</TableHead>
              <TableHead>MEMBER</TableHead>
              <TableHead>TOTAL TASKS</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="flex justify-center items-center">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {
              getAllUserLoading ? <p>Loading...</p> :
                AllUsersWithTasks?.map((ele, index) => {
                  return (
                    <TableRow key={ele?.id} className="hover:bg-slate-100">
                      <TableCell className="font-medium text-base">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-base">
                        <div className="flex">
                          <img
                            src=""
                            alt="img"
                            className="w-12 bg-slate-300 h-12 rounded-full"
                          />
                          <div className="ml-2">
                            <p className="font-bold  text-gray-800">{ele?.name}</p>
                            <p className="font-medium text-gray-500">
                              {ele?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-base">
                        {ele?.taskCount}
                      </TableCell>
                      <TableCell>
                        <div className="w-20 h-8 rounded-md  px-2 py-1">
                          {ele?.status === "pending" ? (
                            <p className="bg-yellow-300 font-semibold text-yellow-950 w-full h-full flex justify-center items-center rounded-lg">
                              {ele?.invitationStatus}
                            </p>
                          ) : (
                            <p className="bg-green-400 text-green-900 font-semibold flex justify-center items-center h-full w-full rounded-lg">
                              {ele?.invitationStatus}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="flex justify-center">
                        <Button
                          variant="outline"
                          className=" text-blue-500"
                          onClick={() => {
                            Navigate(`${ele.id}/viewUser`);
                          }}
                        >
                          View
                        </Button>
                        <ToolTipButton ToolTipcontent="Delete User">
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-2 hover:bg-red-500"
                          >
                            Remove
                          </Button>
                        </ToolTipButton>
                      </TableCell>
                    </TableRow>
                  );
                })
            }
          </TableBody>
        </Table>
      </div>

      {showPopup && (
        <AddUserPopup
          SendData={(info) => {
            calAddUserApi(info)

            if (addUserInfo === "User added and Initation is Been send") {
              setShowPopup(false)
            }
          }}
          loader={addUserLoading}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};
export default AdminUsers;
