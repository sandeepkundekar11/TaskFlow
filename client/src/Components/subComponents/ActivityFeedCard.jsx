/* eslint-disable react/prop-types */
import { Clock, Edit, Trash2 } from "lucide-react";
import TimeUtililty from "../Utilities/TimeUtility";
const ActivityFeedCard = ({ activity }) => {

  const { updateTime } = TimeUtililty()
  const getActionIcon = (action) => {
    switch (action) {
      case "Created":
        return <Edit className="w-6 h-6 text-blue-500" />;

      case "Updated":
        return <Edit className="w-6 h-6 text-yellow-500" />;
      case "Deleted":
        return <Trash2 className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTasks = (action, task) => {
    switch (action) {
      case "Created":
        return (
          <span className="bg-blue-200 pl-1 pr-1 rounded-lg ">{task}</span>
        );

      case "Updated":
        return (
          <span className="bg-green-200 pl-1 pr-1 rounded-lg ">{task}</span>
        );
      case "Deleted":
        return <span className="bg-red-200 pl-1 pr-1 rounded-lg ">{task}</span>;
      default:
        return <span className="bg-blue-300  rounded-lg">{task}</span>;
    }
  };
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow mt-2">
      <div className="flex-shrink-0">{getActionIcon(activity?.action)}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-900 flex flex-wrap">
          <div className="pr-2 font-medium w-14 text-blue-600">
            {activity?.TaskId}
          </div>
          {activity?.name?.name}
          <span className="pl-1 font-extrabold pr-1">{activity?.action}</span>
          the task
          {getTasks(activity?.action, activity?.task)}
        </p>
        <p className="text-xs text-gray-500">{updateTime(activity?.timeStamp)}</p>
      </div>
    </div>
  );
};

export default ActivityFeedCard;
