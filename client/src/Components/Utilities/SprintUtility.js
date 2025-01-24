const SprintUtility = () => {
  const SaveNewTask = (prev, newTask) => {
    return {
      ...prev,
      backlogs: {
        ...prev.backlogs,
        tasks: [
          ...(prev.backlogs?.tasks || []),
          {
            _id: newTask._id,
            title: newTask.title,
            author: newTask.author,
            IsInSprint: newTask?.IsInSprint,
          },
        ],
      },
    };
  };

  const UpdatedTask = (prevTask, TaskId, value) => {
    return {
      ...prevTask,
      backlogs: {
        ...prevTask?.backlogs,
        tasks: prevTask?.backlogs?.tasks.map((task) => {
          if (task?._id === TaskId) {
            return {
              ...task,
              title: value,
            };
          } else {
            return task;
          }
        }),
      },
    };
  };
  return {
    SaveNewTask,
    UpdatedTask,
  };
};
export default SprintUtility;
