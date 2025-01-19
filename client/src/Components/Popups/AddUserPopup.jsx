/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import Popup from "./Popup";


const AddUserPopup = ({ onSendInvitation, onCancel, SendData, loader = false }) => {
    const [user, setUser] = useState({
        username: "",
        userEmail: "",
    })

    const InputHandle = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const [userWarning, setUserWarning] = useState({
        usernameWarning: "",
        userEmailWarning: "",
    })
    const OnSubmit = () => {
        const newWarning = {
            usernameWarning: "",
            userEmailWarning: "",
        };

        // Username validation
        if (user.username.length < 3) {
            newWarning.usernameWarning = "Username must be at least 3 characters long.";
        } else if (!/^[a-zA-Z0-9_]+$/.test(user.username)) {
            newWarning.usernameWarning = "Username can only contain letters, numbers, and underscores.";
        } else {
            newWarning.usernameWarning = "";
        }

        // Email validation
        if (user.userEmail.length < 3) {
            newWarning.userEmailWarning = "Email must be at least 3 characters long.";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.userEmail)) {
            newWarning.userEmailWarning = "Enter a valid email address.";
        } else {
            newWarning.userEmailWarning = "";
        }

        // Set warnings state
        setUserWarning(newWarning);

        // If no warnings, submit the form
        if (Object.values(newWarning).every((val) => val === "")) {
            // Proceed with submitting the form data
            SendData(user)
        }
    };



    return (
        <Popup>
            <div className="w-[600px] h-auto p-4 rounded-md shadow-lg bg-white">
                <h1 className="text-lg font-semibold  mt-2">Add User</h1>
                <p className="text-sm mb-4 text-gray-500">Add new user in this company</p>
                <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="Name">User Name</Label>
                    <Input className="w-full mt-1" type="text" id="Username" name="username" placeholder="Name" onChange={InputHandle} />
                    <p className="font-semibold text-red-600 mt-1 text-sm">{userWarning.usernameWarning}</p>
                </div>
                <div className="grid w-full items-center gap-1.5 mt-4">
                    <Label htmlFor="email">Email</Label>
                    <Input className="w-full mt-1" type="email" id="email" placeholder="Email" name="userEmail" onChange={InputHandle} />
                    <p className="font-semibold text-red-600 mt-1 text-sm">{userWarning.userEmailWarning}</p>
                </div>

                <div className="flex space-x-4 mt-4">
                    <Button className="flex justify-center items-center" onClick={OnSubmit}>{
                        loader ? <div className="w-6 h-6 rounded-full border-b-2  border animate-spin bg-transparent"></div> : "Send invitation"
                    }</Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </Popup>
    )
}
export default AddUserPopup