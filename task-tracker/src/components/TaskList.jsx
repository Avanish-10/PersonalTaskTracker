import TaskRow from "./TaskRow";

function TaskList({
    tasks,
    deleteTask,
    editTask,
    toggleStatus
}) {

    if (tasks.length === 0) {

        return (

            <div className="alert alert-info text-center">

                No tasks found.

            </div>

        );

    }

    return (

        <div className="row">

            {tasks.map(task => (

                <TaskRow
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    toggleStatus={toggleStatus}
                />

            ))}

        </div>

    );

}

export default TaskList;