import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom"


const AdminUserView = () => {
    const Navigate=useNavigate()
    return (
        <div className="w-screen h-screen bg-slate-50 p-4 overflow-x-hidden">
            <div className="w-11/12 m-auto">
                <h1 className="text-4xl font-bold my-4">User Activity logs</h1>
                {/* header start */}
                <Card className="w-full h-auto rounded-md p-2 relative">
                    <CardHeader>
                        <CardTitle className="font-bold text-2xl ">User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2 flex justify-between">
                        <div className="flex space-x-2 items-center">
                            <Avatar className='w-12 h-12'>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-lg text-gray-800 font-semibold">Sandeep K</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-600">Email</p>
                            <p className="text-base text-black font-medium">Sandeep@gmail.com</p>
                        </div>

                        <div>
                            <p className="text-lg font-medium text-gray-600">Role</p>
                            <p className="text-base text-black font-medium">Developer</p>
                        </div>

                        <div>
                            <p className="text-lg font-medium text-gray-600">Last Activity</p>
                            <p className="text-base text-black font-medium">2023-07-05 14:30:00</p>
                        </div>
                    </CardContent>

                    <Button variant="outline" className="absolute right-2 top-3" onClick={() => {
                         Navigate("/admin")
                    }}>/Dashboard</Button>
                </Card>

                {/* header end */}


                {/* body section */}
                <Card className="w-full h-auto p-2 mt-8">
                    <CardHeader>
                        <CardTitle className="font-semibold text-2xl ">User Logs</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[60vh] overflow-x-scroll logcontainer">
                        <Table>
                            <TableCaption>A list of All activity</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">S .No</TableHead>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead className="text-right">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14].map((ele) => {
                                        return (
                                            <TableRow key={ele} className="h-12" >
                                                <TableCell className="font-medium">{ele}</TableCell>
                                                <TableCell className="font-medium">2025-01-05T08:37:45.535Z</TableCell>
                                                <TableCell className="font-medium">	Created task</TableCell>
                                                <TableCell className="text-right font-medium">	Task #599</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                       {/* pagination */}
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
                </Card>
                {/* body section end */}
            </div>
        </div>
    )
}
export default AdminUserView