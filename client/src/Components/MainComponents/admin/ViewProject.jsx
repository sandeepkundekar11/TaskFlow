import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CiFilter, CiSearch } from "react-icons/ci";
import { MdOutlineArrowDropDown } from "react-icons/md";

import AdminLog from "@/Components/subComponents/AdminLog";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";
const ViewProject = () => {
  const Navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-slate-50 p-4 overflow-x-hidden">
      <div className="w-11/12 m-auto">
        <Card className="w-full h-auto rounded-md p-2 relative">
          <CardHeader>
            <CardTitle className="font-semibold text-3xl ">
              Ems (Element Management System)
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <p className="text-lg text-gray-600">
              This Project Manages the all Systems of the offices
            </p>
            <div className="flex  space-x-6 mt-3 ">
              <div className="flex space-x-2">
                <p className=" font-semibold text-gray-700">Status :</p>
                <p className="px-2 rounded-xl bg-green-300 text-green-900">
                  {" "}
                  Active
                </p>
              </div>

              <div className="flex space-x-2">
                <p className=" font-semibold text-gray-700">Start Date :</p>
                <p className="text-gray-500 "> January 15, 2023</p>
              </div>
            </div>
          </CardContent>

          <Button
            variant="outline"
            className="absolute right-2 top-3"
            onClick={() => {
              Navigate("/admin");
            }}
          >
            /Dashboard
          </Button>
        </Card>

        {/* activity logs */}
        <Card className="w-full h-[70vh] p-2 mt-8">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="font-semibold text-2xl ">
                Activity Logs
              </CardTitle>
              <div className="flex space-x-2">
                <div className=" relative">
                  {/* <Label htmlFor="email">Email</Label> */}
                  <CiSearch className="absolute top-1.5 left-1 cursor-pointer w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search Logs.."
                    className="w-52 pl-7"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className="flex space-x-1">
                      <CiFilter />
                      <p>Filter</p>
                      <MdOutlineArrowDropDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem checked>
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Completed
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Created</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Updated</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent className="h-[50vh] overflow-x-scroll border bg-slate-100 logcontainer">
            {[1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12].map((ele) => {
              return <AdminLog key={ele} />;
            })}
          </CardContent>

          <CardFooter>
            <Pagination className="w-full">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>

                <p className="text-gray-800 font-semibold mx-20">Page 1 of 1</p>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default ViewProject;
