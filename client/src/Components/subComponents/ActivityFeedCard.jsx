/* eslint-disable react/prop-types */
import { Clock, Edit, Trash2 } from "lucide-react";

const ActivityFeedCard = ({ activity }) => {
  const getActionIcon = (action) => {
    switch (action) {
      case "Created":
        return <Edit className="w-6 h-6 text-blue-500" />;

      case "Updated":
        return <Edit className="w-6 h-6 text-yellow-500" />;
      case "Deleted":
        return <Trash2 className="w-6 h-6 text-red-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow mt-2">
      <div className="flex-shrink-0">{getActionIcon(activity?.action)}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-900 flex">
          <div className="pr-2 font-medium w-14 text-blue-600">{activity?.TaskId}</div>{activity?.name?.name} {activity?.action} the task {activity?.task}
        </p>
        <p className="text-xs text-gray-500">{activity?.timeStamp}</p>
      </div>
    </div>
  );
};

export default ActivityFeedCard;
