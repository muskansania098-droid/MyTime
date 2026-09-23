import React, { useState } from 'react'
import './Reports.css'

const Reports = ({ tasks }) => {

  const [filterStatus, setFilterStatus] = useState("All")

  const filteredTasks = tasks.filter(task =>
    filterStatus === "All" || task.status === filterStatus
  )


  const totalTasks = filteredTasks.length

  const completedTasks = filteredTasks.filter(
    task => task.status === "Completed"
  ).length

  const inProgressTasks = filteredTasks.filter(
    task => task.status === "In Progress"
  ).length

  const pendingTasks = filteredTasks.filter(
    task => task.status === "Pending"
  ).length


  const completionRate = totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100)


  const projects = [...new Set(
    filteredTasks.map(task => task.project)
  )]


  const today = new Date()
  today.setHours(0, 0, 0, 0)


  const overdueTasks = filteredTasks.filter(task => {

    if (!task.date || task.status === "Completed") {
      return false
    }

    const deadline = new Date(task.date)
    deadline.setHours(0, 0, 0, 0)

    return deadline < today

  })


  const upcomingTasks = filteredTasks.filter(task => {

    if (!task.date || task.status === "Completed") {
      return false
    }

    const deadline = new Date(task.date)
    deadline.setHours(0, 0, 0, 0)

    return deadline >= today

  })


  const completedDeadlineTasks = filteredTasks.filter(task =>
    task.date && task.status === "Completed"
  )


  const highPriorityTasks = filteredTasks.filter(
    task => task.priority === "High"
  ).length


  const tasksWithDeadlines = filteredTasks.filter(
    task => task.date
  ).length


  const tasksWithoutDeadlines = filteredTasks.filter(
    task => !task.date
  ).length


  const averageTasksPerProject = projects.length === 0
    ? 0
    : (totalTasks / projects.length).toFixed(1)


  // EXPORT REPORT

  const exportReport = () => {

    const report = `
TASKFLOW REPORT
========================

Total Tasks: ${totalTasks}
Completed: ${completedTasks}
In Progress: ${inProgressTasks}
Pending: ${pendingTasks}

Completion Rate: ${completionRate}%

Total Projects: ${projects.length}
Average Tasks / Project: ${averageTasksPerProject}
High Priority Tasks: ${highPriorityTasks}
Tasks With Deadlines: ${tasksWithDeadlines}
Tasks Without Deadlines: ${tasksWithoutDeadlines}

Deadline Analysis
------------------------
Overdue: ${overdueTasks.length}
Upcoming: ${upcomingTasks.length}
Completed With Deadline: ${completedDeadlineTasks.length}
`

    const file = new Blob([report], {
      type: "text/plain"
    })

    const url = URL.createObjectURL(file)

    const link = document.createElement("a")

    link.href = url
    link.download = "TaskFlow-Report.txt"

    link.click()

    URL.revokeObjectURL(url)
  }


  return (
    <div className="right">

      <div className="dashboard-header">

        <h1>Reports</h1>

        <p>
          View your task progress and productivity.
        </p>

        <button
          className="export-report"
          onClick={exportReport}
        >
          Export Report
        </button>

      </div>


      {/* FILTER */}

      <div className="report-filter">

        <label>Filter by status:</label>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>

      </div>


      <div className="stats">

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <h2>{totalTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>{completedTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <h2>{inProgressTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>{pendingTasks}</h2>
        </div>

      </div>


      <div className="report-section">

        <h2>Completion Rate</h2>

        <div className="completion-number">
          {completionRate}%
        </div>

        <div className="report-progress-bar">

          <div
            className="report-progress-fill"
            style={{
              width: `${completionRate}%`
            }}
          ></div>

        </div>

      </div>


      <div className="report-section">

        <h2>Task Status</h2>

        <div className="status-row">
          <span>Completed</span>
          <span>{completedTasks}</span>
        </div>

        <div className="status-row">
          <span>In Progress</span>
          <span>{inProgressTasks}</span>
        </div>

        <div className="status-row">
          <span>Pending</span>
          <span>{pendingTasks}</span>
        </div>

      </div>


      <div className="report-section">

        <h2>Task Status Overview</h2>

        <div className="status-chart">

          <div className="chart-item">

            <div className="chart-label">
              <span>Completed</span>
              <span>{completedTasks}</span>
            </div>

            <div className="chart-bar">

              <div
                className="chart-fill completed"
                style={{
                  width: `${totalTasks === 0
                    ? 0
                    : (completedTasks / totalTasks) * 100}%`
                }}
              ></div>

            </div>

          </div>


          <div className="chart-item">

            <div className="chart-label">
              <span>In Progress</span>
              <span>{inProgressTasks}</span>
            </div>

            <div className="chart-bar">

              <div
                className="chart-fill in-progress"
                style={{
                  width: `${totalTasks === 0
                    ? 0
                    : (inProgressTasks / totalTasks) * 100}%`
                }}
              ></div>

            </div>

          </div>


          <div className="chart-item">

            <div className="chart-label">
              <span>Pending</span>
              <span>{pendingTasks}</span>
            </div>

            <div className="chart-bar">

              <div
                className="chart-fill pending"
                style={{
                  width: `${totalTasks === 0
                    ? 0
                    : (pendingTasks / totalTasks) * 100}%`
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>


      <div className="report-section">

        <h2>Project Performance</h2>

        {projects.length === 0 ? (

          <p className="no-projects">
            No projects yet.
          </p>

        ) : (

          projects.map((project, index) => {

            const projectTasks = filteredTasks.filter(
              task => task.project === project
            )

            const completedProjectTasks = projectTasks.filter(
              task => task.status === "Completed"
            ).length

            const projectProgress = Math.round(
              (completedProjectTasks / projectTasks.length) * 100
            )

            return (

              <div className="report-project" key={index}>

                <div className="report-project-info">

                  <h3>{project}</h3>

                  <span>
                    {completedProjectTasks} / {projectTasks.length} completed
                  </span>

                </div>

                <div className="report-progress-bar">

                  <div
                    className="report-progress-fill"
                    style={{
                      width: `${projectProgress}%`
                    }}
                  ></div>

                </div>

                <p className="project-percentage">
                  {projectProgress}% complete
                </p>

              </div>

            )

          })

        )}

      </div>


      <div className="report-section">

        <h2>Deadline Analysis</h2>

        <div className="deadline-summary">

          <div className="deadline-card">
            <h3>Overdue</h3>
            <h2>{overdueTasks.length}</h2>
          </div>

          <div className="deadline-card">
            <h3>Upcoming</h3>
            <h2>{upcomingTasks.length}</h2>
          </div>

          <div className="deadline-card">
            <h3>Completed</h3>
            <h2>{completedDeadlineTasks.length}</h2>
          </div>

        </div>


        {overdueTasks.length > 0 && (

          <div className="deadline-list">

            <h3>Overdue Tasks</h3>

            {overdueTasks.map((task, index) => (

              <div className="report-deadline" key={index}>

                <div>
                  <strong>{task.name}</strong>
                  <p>{task.project}</p>
                </div>

                <span>{task.date}</span>

              </div>

            ))}

          </div>

        )}


        {upcomingTasks.length > 0 && (

          <div className="deadline-list">

            <h3>Upcoming Tasks</h3>

            {upcomingTasks.map((task, index) => (

              <div className="report-deadline" key={index}>

                <div>
                  <strong>{task.name}</strong>
                  <p>{task.project}</p>
                </div>

                <span>{task.date}</span>

              </div>

            ))}

          </div>

        )}

      </div>


      <div className="report-section">

        <h2>Productivity Summary</h2>

        <div className="productivity-grid">

          <div className="productivity-card">
            <h3>Total Projects</h3>
            <h2>{projects.length}</h2>
          </div>

          <div className="productivity-card">
            <h3>Average Tasks / Project</h3>
            <h2>{averageTasksPerProject}</h2>
          </div>

          <div className="productivity-card">
            <h3>High Priority Tasks</h3>
            <h2>{highPriorityTasks}</h2>
          </div>

          <div className="productivity-card">
            <h3>Tasks With Deadlines</h3>
            <h2>{tasksWithDeadlines}</h2>
          </div>

          <div className="productivity-card">
            <h3>Tasks Without Deadlines</h3>
            <h2>{tasksWithoutDeadlines}</h2>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Reports