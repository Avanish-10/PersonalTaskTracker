import { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

    function logout() {

    localStorage.clear();

    window.location.href = "/login";

}

    function editTask(task) {

    setEditingTaskId(task.id);

   setNewTask({
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
    dueDate: task.dueDate
        ? task.dueDate.substring(0,16)
        : "",
   
});

}

    const [tasks, setTasks] = useState([]);
const [search, setSearch] = useState("");
const [selectedMonth, setSelectedMonth] = useState("all");

    const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
    
});

    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addTask(e) {
        e.preventDefault();

        if (newTask.title.trim() === "") {

    alert("Task title is required.");

    return;

}
        try {
            await api.post("/tasks", newTask);

            setNewTask({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
    
});

            loadTasks();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTask(id) {
    try {
       if (!window.confirm("Delete this task?")) return;

await api.delete(`/tasks/${id}`);
        loadTasks();
    } catch (error) {
        console.error(error);
    }
}
    async function updateTask(e) {

    e.preventDefault();

    if (newTask.title.trim() === "") {

    alert("Task title is required.");

    return;

}

    try {

        await api.put(`/tasks/${editingTaskId}`, {
            id: editingTaskId,
            ...newTask
        });

        setNewTask({
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
});

        setEditingTaskId(null);

        loadTasks();

    }

    catch (error) {

        console.error(error);

    }

}


async function toggleStatus(task) {

    try {

        await api.put(`/tasks/${task.id}`, {

            ...task,

            isCompleted: !task.isCompleted

        });

        loadTasks();

    }

    catch (error) {

        console.error(error);

    }

}
const months = [
    "all",
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
    "2026-07",
    "2026-08",
    "2026-09",
    "2026-10",
    "2026-11",
    "2026-12"
];

const filteredTasks = tasks.filter(task => {

    const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

    const matchesMonth =
        selectedMonth === "all" ||
        (
            task.dueDate &&
            task.dueDate.startsWith(selectedMonth)
        );

    return matchesSearch && matchesMonth;

});

    return (
    <div className="container mt-5">

       <div className="text-center mb-5">

    <div className="d-flex justify-content-between align-items-center mb-5">

    <div>

        <h2>

            Welcome,

            {localStorage.getItem("username")}

        </h2>

        <p className="text-muted">

            Personal Task Tracker

        </p>

    </div>

    <button
        className="btn btn-danger"
        onClick={logout}
    >

        Logout

    </button>

</div>

    <p className="text-muted">

        "One worthwhile task carried to a successful conclusion is worth half-a-hundred half-finished tasks." - Malcolm S. Forbes

    </p>

</div>

<div className="row mb-4">

    <div className="col-md-4">

        <div className="card text-center border-primary">

            <div className="card-body">

                <h5>Total Tasks</h5>

                <h2>{tasks.length}</h2>

            </div>

        </div>

    </div>

    <div className="col-md-4">

        <div className="card text-center border-success">

            <div className="card-body">

                <h5>Completed</h5>

                <h2>

                    {tasks.filter(t => t.isCompleted).length}

                </h2>

            </div>

        </div>

    </div>

    <div className="col-md-4">

        <div className="card text-center border-warning">

            <div className="card-body">

                <h5>Pending</h5>

                <h2>

                    {tasks.filter(t => !t.isCompleted).length}

                </h2>

            </div>

        </div>

    </div>

</div>

       <TaskForm
    newTask={newTask}
    setNewTask={setNewTask}
    addTask={addTask}
    updateTask={updateTask}
    editingTaskId={editingTaskId}
/>

       <div className="card filter-card shadow-sm mb-4">

    <div className="card-body">

        <h5 className="mb-3">
           Search & Filter
        </h5>

        <div className="row">

            <div className="col-md-6 mb-3 mb-md-0">

                <input
                    className="form-control"
                    placeholder="🔍 Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="col-md-6">

                <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="all">All Months</option>
                    <option value="2026-01">January</option>
                    <option value="2026-02">February</option>
                    <option value="2026-03">March</option>
                    <option value="2026-04">April</option>
                    <option value="2026-05">May</option>
                    <option value="2026-06">June</option>
                    <option value="2026-07">July</option>
                    <option value="2026-08">August</option>
                    <option value="2026-09">September</option>
                    <option value="2026-10">October</option>
                    <option value="2026-11">November</option>
                    <option value="2026-12">December</option>
                </select>

            </div>

        </div>

    </div>

</div>

<TaskList
    tasks={filteredTasks}
    deleteTask={deleteTask}
    editTask={editTask}
    toggleStatus={toggleStatus}
/>

    </div>
);
}

export default App;