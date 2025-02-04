/* eslint-disable no-unused-vars */
import useGetApi from "@/CustomHooks/useGetApi";
import usePostApi from "@/CustomHooks/usePostApi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import UserDeletePopup from "../Popups/DeleteUser";
import useDeleteApi from "@/CustomHooks/useDeleteApi";

const AdminUsers = () => {
  const Navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [popupTitle, setPopupTitle] = useState("");

  const [AllUsersWithTasks, SetAllUsersWithTasks] = useState();
  const {
    data: allUserData,
    loading: getAllUserLoading,
    callApi: callGetAllUser,
  } = useGetApi(`${BASE_URL}/admin/getUserWithTaskCount`);
  const {
    data: addUserInfo,
    loading: addUserLoading,
    callApi: calAddUserApi,
  } = usePostApi(`${BASE_URL}/admin/addUser`);

  // calling delete api
  const {
    callApi: DeleleUser,
    data: deleteMessage,
    loading: deleteUserLoading,
  } = useDeleteApi();
  //
  useEffect(() => {
    callGetAllUser();
    setPopupTitle("");
  }, [addUserInfo, deleteMessage]);

  useEffect(() => {
    SetAllUsersWithTasks(allUserData?.users);
  }, [allUserData]);

  // stores the seletced user Id to delete the user
  const [SelectedUserId, setSelectedUserId] = useState();
  // popup component arr
  const Components = [
    {
      title: "adduser",
      comp: (
        <AddUserPopup
          SendData={(info) => {
            calAddUserApi(info);

            if (addUserInfo === "User added and Initation is Been send") {
              setPopupTitle("");
            }
          }}
          loader={addUserLoading}
          onCancel={() => setPopupTitle("")}
        />
      ),
    },

    {
      title: "removeUser",
      comp: (
        <UserDeletePopup
          loading={deleteUserLoading}
          OnDelete={() => {
            console.log(SelectedUserId, "SelectedUserId");
            DeleleUser(`${BASE_URL}/admin/deleteUser/${SelectedUserId}`);
          }}
          onCancel={() => setPopupTitle("")}
        />
      ),
    },
  ];

  // this function returns the popups based on title
  const GetPopups = (title) => {
    let components = Components.find((com) => com.title === title);

    if (!components) {
      return <></>;
    } else {
      return components.comp;
    }
  };

  return (
    <div className="w-[85%]">
      <div className="table h-[60vh]  w-full overflow-x-scroll">
        {/* add user button */}

        <div className="w-full flex justify-end">
          <Button
            className="mt-3 w-32 h-8 rounded-sm shadow-md bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setPopupTitle("adduser");
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
            {getAllUserLoading ? (
              <p>Loading...</p>
            ) : (
              AllUsersWithTasks?.map((ele, index) => {
                return (
                  <TableRow key={ele?.id} className="hover:bg-slate-100">
                    <TableCell className="font-medium text-base">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium text-base">
                      <div className="flex">
                        <Avatar className="border border-black">
                          <AvatarFallback className="bg-blue-200">
                            {ele?.name?.split(" ").length > 1
                              ? ele?.name?.split(" ")[0] +
                                ele?.name?.split(" ")[0]
                              : ele?.name[0] + ele?.name[1]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-2">
                          <p className="font-bold  text-gray-800">
                            {ele?.name}
                          </p>
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
                      <div className="w-20 h-8 rounded-md  ">
                        {ele?.invitationStatus === "pending" ? (
                          <p className="bg-yellow-200 font-semibold text-yellow-950 w-full h-full flex justify-center items-center rounded-lg">
                            {ele?.invitationStatus}
                          </p>
                        ) : (
                          <p className="bg-green-200 text-green-900 font-semibold flex justify-center items-center h-full w-full rounded-lg">
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
                          onClick={() => {
                            setSelectedUserId(ele.id);
                            setPopupTitle("removeUser");
                          }}
                        >
                          Remove
                        </Button>
                      </ToolTipButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {GetPopups(popupTitle)}
    </div>
  );
};
export default AdminUsers;
