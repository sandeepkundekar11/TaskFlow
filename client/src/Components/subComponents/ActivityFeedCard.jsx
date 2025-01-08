/* eslint-disable react/prop-types */
import { Clock, Edit } from "lucide-react";

const ActivityFeedCard = ({ activity }) => {
  const { user, action, task, timestamp } = activity;
  const getActionIcon = (action) => {
    switch (action) {
      case "created":
        return <Edit className="w-6 h-6 text-blue-500" />;

      case "updated":
        return <Edit className="w-6 h-6 text-yellow-500" />;

      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow mt-2">
      <div className="flex-shrink-0">{getActionIcon(action)}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-900">
          {user} {action} the task {task}
        </p>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityFeedCard;
