import UserNavbar from "@/Components/subComponents/userNavBar.jsx"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"

const UserHome = () => {
    return (
        <div className="w-screen h-screen bg-slate-50">
            <UserNavbar />

            <div className=" h-auto pt-20 grid md:grid-cols-8 grid-cols-5 w-[95%] m-auto md:space-x-4 ">
                <Card className="md:col-span-5 col-span-7 rounded-none">
                    <CardHeader>
                        <h1 className="text-xl font-bold">Your projects</h1>
                        <p className="text-lg text-gray-500">Projects you are currently involved in</p>
                    </CardHeader>
                </Card>
                <Card className="md:col-span-3 col-span-4 h-[500px] rounded-none">
                    <CardHeader>
                        <h1 className="text-xl font-bold">Recent Logins</h1>
                        <p className="text-lg text-gray-500">Your recent project logins</p>
                    </CardHeader>
                    <CardContent className=""></CardContent>
                    <CardFooter>
                        <Button className="w-full h-10 bg-slate-200 hover:bg-slate-300 text-black rounded-md"> see more..</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
export default UserHome