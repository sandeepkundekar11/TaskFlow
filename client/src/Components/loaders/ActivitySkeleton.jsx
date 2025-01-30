const ActivitySkeleton = () => {
  return (
    <div className="space-y-4 p-4 bg-white">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex space-x-4 bg-gray-200 p-4 rounded-lg mt-1"
        >
          {/* Profile Icon */}
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

          <div className="flex-1 space-y-2">
            {/* Name and Date */}
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>

            {/* Status Badge */}
            <div className="w-20 h-6 bg-gray-300 rounded"></div>

            {/* Task Description */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitySkeleton;
