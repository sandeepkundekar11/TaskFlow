/* eslint-disable no-unsafe-optional-chaining */
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

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetApi from "@/CustomHooks/useGetApi";
import { BASE_URL } from "@/constants";
import ActivitySkeleton from "@/Components/loaders/ActivitySkeleton";
const ViewProject = () => {
  const Navigate = useNavigate();

  const [projectPagination, setProjectPagination] = useState({
    start: 0,
    end: 6,
  });

  // pages count
  const [PageCountInfo, setPageCountInfo] = useState({
    presentPage: 1,
    totalPages: 1,
  });

  const { id } = useParams();
  // calling the get

  const [viewProjectInfo, setViewProjectInfo] = useState();
  const [projectActivity, setProjectActivity] = useState([]);

  //single page data

  const {
    callApi: getProjectInfo,
    data: projectInfo,
    loading: projectInfoLoading,
  } = useGetApi(
    `${BASE_URL}/admin/viewProject/${id}?start=${projectPagination.start}&&limit=${projectPagination?.end}`
  );

  return (
    <div className="w-screen h-screen bg-slate-50 p-4 overflow-x-hidden">
      <div className="w-11/12 m-auto">
        <Card className="w-full h-auto rounded-md p-2 relative">
          <CardHeader>
            <CardTitle className="font-semibold text-3xl ">
              {viewProjectInfo?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <p className="text-lg text-gray-600">
              {viewProjectInfo?.description}
            </p>
            <div className="flex  space-x-6 mt-3 ">
              <div className="flex space-x-2">
                <p className=" font-semibold text-gray-700">Status :</p>
                <p className="px-2 rounded-xl bg-green-300 text-green-900">
                  {viewProjectInfo?.status}
                </p>
              </div>

              <div className="flex space-x-2">
                <p className=" font-semibold text-gray-700">Start Date :</p>
                <p className="text-gray-500 flex space-x-1 ">
                  <div>
                    {new Date(viewProjectInfo?.startTime).toLocaleDateString()}
                  </div>
                  <div>
                    {new Date(viewProjectInfo?.startTime).toLocaleTimeString()}
                  </div>
                </p>
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
            {projectInfoLoading ? (
              <ActivitySkeleton />
            ) : (
              <>
                {projectActivity?.map((log, index) => {
                  // Check if the current index falls within the pagination range
                  if (
                    index >= projectPagination.start &&
                    index < projectPagination.end
                  ) {
                    return <AdminLog key={log.id || index} info={log} />; // Use unique key, log.id or index
                  }
                  return null; // Avoid rendering undefined elements
                })}
              </>
            )}
          </CardContent>

          <CardFooter>
            <Pagination className="w-full">
              <PaginationContent>
                <PaginationItem>
                  {projectPagination.start !== 0 && (
                    <PaginationPrevious
                    // onClick={}
                    />
                  )}
                </PaginationItem>

                <p className="text-gray-800 font-semibold mx-20">
                  Page 1 of {PageCountInfo?.totalPages}
                </p>
                <PaginationItem>
                  {projectPagination.end < projectInfo?.activityCount && (
                    <PaginationNext
                    // onClick={ }
                    />
                  )}
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
