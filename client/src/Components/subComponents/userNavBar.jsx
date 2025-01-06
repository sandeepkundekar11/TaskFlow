import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"
import {
    Card
} from "@/components/ui/card"
import LogoComp from "./LogoComp"
const UserNavbar = () => {
    return (
        <Card className="w-screen h-16 absolute top-0 z-50 rounded-none flex justify-between items-center space-x-8 pr-3">
            <LogoComp />
            <div className="flex items-center space-x-8 cursor-pointer">
                <ul className="flex h-full items-center space-x-8">
                    <li className="font-bold">SignOut</li>
                    <li className="font-bold">Profile</li>
                </ul>
                <Avatar className="border-gray-600  shadow-2xl w-10 h-10 ">
                    <AvatarFallback className="bg-blue-200">AK</AvatarFallback>
                </Avatar>
            </div>
        </Card>

    )
}
export default UserNavbar