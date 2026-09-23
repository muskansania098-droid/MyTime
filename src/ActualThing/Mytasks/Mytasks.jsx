import React, { useState } from 'react'


const MyTasks = ({ tasks, setTasks }) => {
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterProject, setFilterProject] = useState("All");
  const [taskDate, setTaskDate] = useState("");


  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Pending");

  const [showTaskForm, setShowTaskForm] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const [searchTask, setSearchTask] = useState("");


    const filteredTasks = tasks.filter((task) =>
    (task.name.toLowerCase().includes(searchTask.toLowerCase()) ||
    task.project.toLowerCase().includes(searchTask.toLowerCase())) &&
    (filterPriority === "All" || task.priority === filterPriority) &&
    (filterStatus === "All" || task.status === filterStatus) &&
    (filterProject === "All" || task.project === filterProject)
  );


  return (

    <div className="right">

      <div className="dashboard-header">

        <h1>My Tasks</h1>

        <p>Manage and track all your tasks.</p>


        <button
          className='create-task'
          onClick={() => setShowTaskForm(true)}
        >
          Create Task
        </button>


        {showTaskForm && (

          <div className="task-form">

            <h2>Create New Task</h2>


            <input
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />


            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />


            <input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />


            {error && (
              <p className="task-error">{error}</p>
            )}


            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >

              <option value="High">High</option>

              <option value="Medium">Medium</option>

              <option value="Low">Low</option>

            </select>


            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >

              <option value="Pending">Pending</option>

              <option value="In Progress">In Progress</option>

              <option value="Completed">Completed</option>

            </select>


            <button
              onClick={() => {

                if (taskName.trim() === "" || projectName.trim() === "") {
                  setError("Please enter a task name and project name")
                  return
                }

                setError("")

                if (editIndex !== null) {

                  const updatedTasks = [...tasks]

                  updatedTasks[editIndex] = {
                    name: taskName,
                    project: projectName,
                    date: taskDate,
                    priority: priority,
                    status: status
                  }

                  setTasks(updatedTasks)

                  setEditIndex(null)

                } else {

                  const newTask = {
                    name: taskName,
                    project: projectName,
                    date: taskDate,
                    priority: priority,
                    status: status
                  }

                  setTasks([...tasks, newTask])

                }

                setTaskName("")
                setProjectName("")
                setTaskDate("")
                setPriority("High")
                setStatus("Pending")
                setShowTaskForm(false)

              }}
            >
              {editIndex !== null ? "Edit Task" : "Create Task"}
            </button>

          </div>

        )}

      </div>


      <div className="task-list">

        <h2>All Tasks</h2>


        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
        />


        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >

          <option value="All">All Priorities</option>

          <option value="High">High</option>

          <option value="Medium">Medium</option>

          <option value="Low">Low</option>

        </select>


        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >

          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="All">All Projects</option>

            {[...new Set(tasks.map(task => task.project))].map((project, index) => (
              <option value={project} key={index}>
                {project}
              </option>
            ))}
          </select>

          <option value="All">All Statuses</option>

          <option value="Pending">Pending</option>

          <option value="In Progress">In Progress</option>

          <option value="Completed">Completed</option>

        </select>


        {filteredTasks.length === 0 ? (

          <p className="no-tasks">No tasks found.</p>

        ) : (

          filteredTasks.map((task) => {

            const originalIndex = tasks.indexOf(task)

            return (

              <div className="task-row" key={originalIndex}>

                <div>

                  <h3>{task.name}</h3>

                  <p>{task.project}</p>

                </div>


                <span>{task.priority}</span>

                <span>{task.status}</span>

                <span>{task.date || "No deadline"}</span>


                <div className="task-actions">

                  <button
                    onClick={() => {

                      setEditIndex(originalIndex)

                      setTaskName(task.name)

                      setProjectName(task.project)

                      setTaskDate(task.date)

                      setPriority(task.priority)

                      setStatus(task.status)

                      setShowTaskForm(true)

                    }}
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => {

                      setTasks(tasks.filter((_, i) => i !== originalIndex))

                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            )

          })

        )}

      </div>

    </div>

  )
}

export default MyTasks