/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const CustomPopupProvider = ({
  children,
  buttonName,
  Heading,
  isOpen,
  seIsOpen,
  HandleSave,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={seIsOpen} modal={false}>
      <DialogTrigger>
        <Button className="bg-blue-600 hover:bg-blue-500">{buttonName}</Button>
      </DialogTrigger>
      {isOpen && (
        <div className="w-screen h-screen fixed top-0 left-0 z-50 ">
          <DialogContent
            className="w-[600px] max-w-full bg-white shadow-2xl"
            onInteractOutside={(event) => event.preventDefault()}
          >
            <DialogHeader className="font-bold text-xl text-gray-600">
              {Heading}
            </DialogHeader>
            <DialogDescription>{children}</DialogDescription>
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                onClick={HandleSave}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
};

export default CustomPopupProvider;
