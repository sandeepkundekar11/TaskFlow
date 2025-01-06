import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUserPopup from "../Popups/AddUserPopup";
import { Button } from "../ui/button";
import ToolTipButton from "./TooltipButton";

const AdminUsers = () => {
  const Navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const users = [
    {
      id: 1,
      name: "sandeep n K",
      email: "sandeep@gmail.com",
      TotalTask: 40,
    },
    {
      id: 2,
      name: "Anilk",
      email: "Anilk@gmail.com",
      TotalTask: 34,
    },
  ];
  return (
    <div className="w-[85%]">
      <div className="table h-[60vh]  w-full overflow-x-scroll bg-slate-50">
        <Table>
          <TableCaption>A list of your All Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S .No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Task Created</TableHead>
              <TableHead className="flex justify-center items-center">
                View User
              </TableHead>
              <TableHead>Remove User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((ele) => {
              return (
                <TableRow key={ele?.id} className="hover:bg-slate-100">
                  <TableCell className="font-medium text-base">
                    {ele?.id}
                  </TableCell>
                  <TableCell className="font-medium text-base">
                    {ele?.name}
                  </TableCell>
                  <TableCell className="font-medium text-base">
                    {ele?.email}
                  </TableCell>
                  <TableCell className="font-medium text-base">
                    {ele?.TotalTask}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Button
                      variant="link"
                      className=" w-32 text-blue-500"
                      onClick={() => {
                        Navigate(`${ele.id}/viewUser`);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <ToolTipButton ToolTipcontent="Delete User">
                      <Button variant="destructive" size="sm" className="ml-2">
                        Remove
                      </Button>
                    </ToolTipButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* add user button */}

      <Button
        className="mt-3 w-28 h-8 rounded-sm shadow-md bg-blue-500 hover:bg-blue-600"
        onClick={() => {
          setShowPopup(true);
        }}
      >
        Add New User
      </Button>

      {showPopup && (
        <AddUserPopup
          onSendInvitation={() => {}}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};
export default AdminUsers;
