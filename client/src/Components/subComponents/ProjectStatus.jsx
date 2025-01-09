import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import CustomTaskAccordian from "./CustomAccordian";

const ProjectStatus = () => {
  return (
    <div className="w-[95%] p-4">
      <h1 className="text-2xl font-semibold">QuizMaster</h1>
      <p className="text-base mt-2 text-gray-600">
        An advanced quiz application for educational institutions.
      </p>
      <Card className="w-full h-auto mt-2 p-2 shadow-none border-none rounded-none bg-gray-100">
        <CardContent>
          <ul className="w-full flex space-x-3 h-10  ">
            {/* Todo */}
            <li className="w-1/3 font-bold text-base text-center bg-blue-100 flex items-center justify-center text-gray-600  px-2">
              TODO
            </li>

            {/* InProgress */}
            <li className="w-1/3 font-bold text-base text-center bg-blue-100 flex items-center justify-center text-gray-600">
              IN PROGRESS
            </li>
            {/* Done */}
            <li className="w-1/3 font-bold text-base text-center bg-blue-100 flex items-center justify-center text-gray-600">
              DONE
            </li>
          </ul>

          {/* Here Main Task will come */}
          <CustomTaskAccordian
            TaskId={"SP-1"}
            TaskTitle={"this is Task 1 this is Task 1"}
          >
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
            <h1>hellow</h1>
          </CustomTaskAccordian>
        </CardContent>
      </Card>
    </div>
  );
};
export default ProjectStatus;
