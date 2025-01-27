const SprintSubTaskUtililty = () => {
    const updateCurrentSprintAndAddSubTask = (prev, selectedTaskId, newSubTask) => {
        return {
            ...prev,
            project: {
                ...prev?.project
            },
            Tasks: prev?.Tasks?.map((sub) => {
                if (sub._id === selectedTaskId) {
                    return {
                        ...sub,
                        subTasks: [...sub.subTasks, newSubTask]
                    }
                }
                else {
                    return sub
                }
            })
        }
    }


    return {
        updateCurrentSprintAndAddSubTask
    }
}


export default SprintSubTaskUtililty