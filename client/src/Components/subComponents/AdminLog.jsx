import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Card,
    CardContent
} from "@/components/ui/card"

const AdminLog = () => {
    return (
        <div className="w-full">
            <Card className="w-full border-1 my-1 flex flex-col justify-center">
                <CardContent className="flex items-start py-3">
                    <Avatar>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                        <div className="flex space-x-1">
                            <p className="font-semibold">Sandeep k</p>
                            <p className="text-gray-600">May 10, 2023 17:00</p>
                        </div>
                        <div className="">
                            <span className="flex space-x-2"> <p className="font-bold">Completed</p>
                                <p className="font-bold text-gray-500">#EM-10</p>
                            </span>
                            <p>Changed status of Design database schema to In Progress</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
export default AdminLog