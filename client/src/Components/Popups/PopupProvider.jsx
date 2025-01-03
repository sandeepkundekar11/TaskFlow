/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"


const CustomPopupProvider = ({ children, buttonName,ClickHandle ,Heading}) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-blue-600 hover:bg-blue-500" onClick={ClickHandle}>{buttonName}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {Heading}
                </DialogHeader>
                <DialogDescription>
                {children}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default CustomPopupProvider