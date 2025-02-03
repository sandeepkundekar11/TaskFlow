/* eslint-disable no-unsafe-optional-chaining */
import ActivitySkeleton from "@/Components/loaders/ActivitySkeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import useGetApi from "@/CustomHooks/useGetApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminUserView = () => {
  const Navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [UserActivities, setUserActivities] = useState([]);
  // pages count
  const [PageCountInfo, setPageCountInfo] = useState({
    presentPage: 1,
    totalPages: 1,
  });
  const [userPagination, setUserPaginaition] = useState({
    start: 0,
    limit: 10,
  });
  //   // calling get user activity api
  const { userid } = useParams();
  const {
    callApi: getAllUserActivity,
    data: userAllData,
    loading: userDataLoading,
  } = useGetApi(
    `${BASE_URL}/admin/viewUser/${userid}?start=${userPagination.start}&&limit=${userPagination?.limit}`
  );

  useEffect(() => {
    const isDataAvailable = UserActivities?.some(
      (_, index) =>
        index >= userPagination.start && index < userPagination.limit
    );
    if (!isDataAvailable) {
      getAllUserActivity();
    }
  }, [userPagination]);

  useEffect(() => {
    setUserInfo(userAllData?.userInfo);

    if (userAllData?.userActivity) {
      setUserActivities((prev) => {
        return [...prev, ...userAllData?.userActivity];
      });
      setPageCountInfo((prev) => {
        return {
          ...prev,
          totalPages: Math.ceil(userAllData?.activityCount / 10),
        };
      });
    }
  }, [userAllData]);

  const NextPage = () => {
    setUserPaginaition((prev) => {
      return {
        ...prev,
        start: prev.limit,
        limit: prev.limit + 10,
      };
    });
    setPageCountInfo((prev) => {
      return {
        ...prev,
        presentPage: prev.presentPage + 1,
      };
    });
  };

  const Prevpage = () => {
    setUserPaginaition((prev) => {
      return {
        ...prev,
        start: prev.start - 10,
        limit: prev.limit - 10,
      };
    });
    setPageCountInfo((prev) => {
      return {
        ...prev,
        presentPage: prev.presentPage - 1,
      };
    });
  };
  return (
    <div className="w-screen h-screen bg-slate-50 p-4 overflow-x-hidden">
      <div className="w-11/12 m-auto">
        <h1 className="text-4xl font-bold my-4">User Activity logs</h1>
        {/* header start */}
        <Card className="w-full h-auto rounded-md p-2 relative">
          <CardHeader>
            <CardTitle className="font-bold text-2xl ">
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2 flex justify-between">
            <div className="flex space-x-2 items-center">
              <Avatar className="w-12 h-12">
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg text-gray-800 font-semibold">
                {userInfo?.name}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-600">Email</p>
              <p className="text-base text-black font-medium">
                {userInfo?.email}
              </p>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-600">Role</p>
              <p className="text-base text-black font-medium">
                {userInfo?.role === "user" && "Developer"}
              </p>
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

        {/* header end */}

        {/* body section */}
        <Card className="w-full h-[65vh] p-2 mt-8">
          <CardHeader>
            <CardTitle className="font-semibold text-2xl ">User Logs</CardTitle>
          </CardHeader>
          <CardContent className="h-[45vh] overflow-x-scroll logcontainer ">
            <Table>
              <TableCaption>A list of All activity</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Task Id</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDataLoading ? (
                  <ActivitySkeleton />
                ) : (
                  <>
                    {UserActivities?.slice(
                      userPagination.start,
                      userPagination.limit
                    )?.map((ele) => {
                      return (
                        <TableRow
                          key={ele?._id}
                          className="h-12 my-3 border bg-white"
                        >
                          <TableCell className="font-medium">
                            {`#${ele?.TaskId}`}
                          </TableCell>
                          <TableCell className="font-medium">
                            {new Date(ele?.timeStamp).toLocaleString()}
                          </TableCell>
                          <TableCell className="font-medium">
                            {ele?.action === "Updated" && (
                              <p className="text-base bg-green-300 w-24 rounded-lg text-center text-green-800">
                                {ele?.action}
                              </p>
                            )}
                            {ele?.action === "Deleted" && (
                              <p className="text-base bg-red-300 w-24 rounded-lg text-center text-red-800">
                                {ele?.action}
                              </p>
                            )}
                            {ele?.action === "Created" && (
                              <p className="text-base bg-blue-300 w-24 rounded-lg text-center text-blue-800">
                                {ele?.action}
                              </p>
                            )}
                          </TableCell>
                          <TableCell className=" w-72 font-medium text-base">
                            {ele?.task}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {/* pagination */}
          <CardFooter>
            <Pagination className="w-full">
              <PaginationContent>
                <PaginationItem>
                  {userPagination.start !== 0 && (
                    <PaginationPrevious onClick={Prevpage} />
                  )}
                </PaginationItem>

                <p className="text-gray-800 font-semibold mx-20">
                  {" "}
                  Page {PageCountInfo.presentPage} of{" "}
                  {PageCountInfo?.totalPages}
                </p>
                <PaginationItem>
                  {userPagination.limit < userAllData?.activityCount && (
                    <PaginationNext onClick={NextPage} />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
        {/* body section end */}
      </div>
    </div>
  );
};
export default AdminUserView;
