import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

const UserProject = () => {
    return (
        <div className="pt-20 overflow-x-hidden">
            <Card className="w-[95%] m-auto h-auto">
                <h1></h1>
                <CardHeader>
                    <h1 className="text-2xl font-semibold">QuizMaster</h1>
                    <p className="text-base mt-2 text-gray-600">An advanced quiz application for educational institutions.</p>
                </CardHeader>
                <CardContent>

                    {/*create sprint section  */}
                    <Card className="w-full min-h-24 bg-white">
                        <CardHeader>
                            <CardTitle className="text-xl">Sprint 1</CardTitle>
                        </CardHeader>
                        <CardContent>
            
                        </CardContent>
                    </Card>
                    <div className="w-full flex justify-end mt-2">
                            <Button className="w-32" variant="outline">Create Sprint</Button>
                        </div>
                    {/* create Tasks section */}
                    <Card className="w-full min-h-24 bg-white mt-3">
                        <CardHeader>
                            <CardTitle className="text-xl">Create Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* all created stacks will come  here */}
                            <p className="text-gray-600">Tasks are not created yet</p>
                        </CardContent>
                        <CardFooter className="w-full flex justify-end">
                            <Button className="w-32">Create Task</Button>
                        </CardFooter>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
export default UserProject