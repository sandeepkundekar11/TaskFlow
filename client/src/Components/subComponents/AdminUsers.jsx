import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDelete } from "react-icons/md";
import CustomPopupProvider from "../Popups/PopupProvider";
import { Button } from "../ui/button";
import { useState } from "react";

const AdminUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const users = [
    {
      id: 1,
      name: "sandeep n K",
      email: "sandeep@gmail.com",
      TotalTask: 40,
    },
  ];
  return (
    <div className="w-[95%]">
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
                    <Button variant="link" className=" w-32 text-blue-500">
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <MdDelete className="w-6 text-2xl h-8 text-red-500 font-semibold" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* add user button */}
      <CustomPopupProvider
        buttonName="Add New User"
        Heading={"Add User"}
        HandleSave={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        seIsOpen={setIsOpen}
      >
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="Jane Doe"
        />
      </CustomPopupProvider>
    </div>
  );
};
export default AdminUsers;
