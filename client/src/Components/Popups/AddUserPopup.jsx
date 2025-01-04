/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Popup from "./Popup";


const AddUserPopup = ({ onSendInvitation, onCancel }) => {
    return (
        <Popup>
            <div className="w-[600px] h-auto p-4 rounded-md shadow-lg bg-white">
                <h1 className="text-lg font-semibold  mt-2">Add User</h1>
                <p className="text-sm mb-4 text-gray-500">Add new user in this company</p>
                <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="Name">User Name</Label>
                    <Input className="w-full mt-1" type="text" id="Username" placeholder="Name" />
                </div>
                <div className="grid w-full items-center gap-1.5 mt-4">
                    <Label htmlFor="email">Email</Label>
                    <Input className="w-full mt-1" type="email" id="email" placeholder="Email" />
                </div>
             
                <div className="flex space-x-4 mt-4">
                    <Button className="" onClick={onSendInvitation}>Send invitation</Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </Popup>
    )
}
export default AddUserPopup