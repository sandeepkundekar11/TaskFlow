const SprintSubTaskUtililty = () => {
  const updateCurrentSprintAndAddSubTask = (
    prev,
    selectedTaskId,
    newSubTask
  ) => {
    return {
      ...prev,
      project: {
        ...prev?.project,
      },
      Tasks: prev?.Tasks?.map((sub) => {
        if (sub._id === selectedTaskId) {
          return {
            ...sub,
            subTasks: [...sub.subTasks, newSubTask],
          };
        } else {
          return sub;
        }
      }),
    };
  };

  const UpdateTheSubTask = (prev, draggedData, status) => {
    return {
      // first spreading all the object
      ...prev,
      sprints: {
        // then spreading all sprint info
        ...prev?.sprints,
      },
      // then mapping tasks
      Tasks: prev?.Tasks?.map((task) => {
        // if the task id is equals to task id from which the subtask is dragged
        if (task?._id == draggedData?.taskId) {
          return {
            // then dragging that taks
            ...task,
            // then we are mapping the subtasks
            subTasks: task?.subTasks?.map((sub) => {
              //  if subTask id is equels to dragged subtask id then we are updating the status
              if (sub?._id === draggedData?.data?._id) {
                return {
                  ...sub,
                  status: status,
                };
              } else {
                // else returning the subatsk
                return sub;
              }
            }),
          };
        }
        // else returning the Task
        else {
          return task;
        }
      }),
    };
  };

  return {
    updateCurrentSprintAndAddSubTask,
    UpdateTheSubTask,
  };
};

export default SprintSubTaskUtililty;
