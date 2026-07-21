function TaskRow({
    task,
    deleteTask,
    editTask,
    toggleStatus
}) { 

    return (

        <div className="col-md-6 mb-4">

            <div className="card shadow">

                <div className="card-body">

                    <h5 className="card-title">

                        {task.title}

                    </h5>

                    <p className="card-text">

                        {task.description}

                    </p>
                    
                    <p className="text-muted mb-1">
    <strong>Created:</strong>{" "}
    {new Date(task.createdAt).toLocaleString()}
</p>

<p className="text-muted mb-2">
    <strong>Due:</strong>{" "}
    {task.dueDate
        ? new Date(task.dueDate).toLocaleString()
        : "No Due Date"}
</p>

<p className="text-muted">
    <strong>Email:</strong> {task.email}
</p>

                    <span

    className={
        task.isCompleted
            ? "badge bg-success"
            : "badge bg-warning text-dark"
    }

    style={{cursor:"pointer"}}

    onClick={() => toggleStatus(task)}

>

    {task.isCompleted
        ? "Completed"
        : "Pending"}

</span>

                    <hr />

                    <button
                        className="btn btn-warning me-2"
                        onClick={() => editTask(task)}
                    >

                        <i className="bi bi-pencil"></i>

                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() => deleteTask(task.id)}
                    >

                        <i className="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        </div>

    );

}

export default TaskRow;