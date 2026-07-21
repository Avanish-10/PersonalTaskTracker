import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function TaskForm({

    newTask,

    setNewTask,

    addTask,

    updateTask,

    editingTaskId

}){

    return (

        <form

    onSubmit={
        editingTaskId
            ? updateTask
            : addTask
    }
 className="mb-4">

            <div className="mb-3">

                <input
                    className="form-control"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            title: e.target.value
                        })
                    }
                />

            </div>

            <div className="mb-3">

                <textarea
                    className="form-control"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            description: e.target.value
                        })
                    }
                />

            </div>
            <div className="mb-3">

   <label className="form-label">
    Due Date & Time
</label>

<DatePicker
    selected={newTask.dueDate ? new Date(newTask.dueDate) : null}
    onChange={(date) =>
    setNewTask({
        ...newTask,
        dueDate: date
            ? format(date, "yyyy-MM-dd'T'HH:mm:ss")
            : ""
    })
}
    showTimeSelect
    dateFormat="dd/MM/yyyy HH:mm"
timeFormat="HH:mm"
    className="form-control"
    placeholderText="Select Due Date"
/>


</div>

            <button className="btn btn-primary">
    {editingTaskId ? "Update Task" : "Add Task"}
</button>

        </form>

    );
}

export default TaskForm;