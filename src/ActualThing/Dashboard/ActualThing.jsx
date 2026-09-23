import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ActualThing.css'
import MyTasks from '../MyTasks/MyTasks'
import Calendar from '../Calendar/Calendar'
import Reports from '../Reports/Reports'
import Settings from '../Settings/Settings'


const ActualThing = ({ setIsLoggedIn, theme, setTheme }) => {

  const navigate = useNavigate()


  const [page, setPage] = useState("Dashboard");


  const userEmail = localStorage.getItem("taskflowEmail")

  const taskStorageKey = `taskflowTasks_${userEmail}`


  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem(taskStorageKey)

    return savedTasks ? JSON.parse(savedTasks) : []

  })


  useEffect(() => {

    localStorage.setItem(
      taskStorageKey,
      JSON.stringify(tasks)
    )

  }, [tasks, taskStorageKey])


  const userName = localStorage.getItem("taskflowName") || "there"

  const currentHour = new Date().getHours()

  let greeting = "Good morning"

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon"
  } else if (currentHour >= 18) {
    greeting = "Good evening"
  }


  const handleLogout = () => {

    localStorage.removeItem("taskflowLoggedIn")

    setIsLoggedIn(false)

    navigate("/")

  }


  const today = new Date()

  const todayString =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`


  const upcomingTasks = tasks
    .filter(task => {
      return task.date && task.date >= todayString
    })
    .sort((a, b) => a.date.localeCompare(b.date))


  console.log(tasks)


  return (

    <div className={`actual ${theme === "Dark" ? "dark-mode" : ""}`}>


      <div className="left">

        <div className='dash'>

          <div onClick={() => setPage("Dashboard")}>
            Dashboard
          </div>

          <div onClick={() => setPage("My Tasks")}>
            My Tasks
          </div>

          <div onClick={() => setPage("Calendar")}>
            Calendar
          </div>

          <div onClick={() => setPage("Reports")}>
            Reports
          </div>

          <div onClick={() => setPage("Settings")}>
            Settings
          </div>

        </div>


        <div onClick={handleLogout}>
          Log Out
        </div>


      </div>


      {page === "Dashboard" ? (

        <div className="right">


          <div className="dashboard-header">

            <h1>{greeting}, {userName} 👋</h1>

            <p>
              Here's what's happening with your work today.
            </p>

          </div>


          <div className="stats">


            <div className="stat-card">

              <h3>Total Tasks</h3>

              <h2>{tasks.length}</h2>

            </div>


            <div className="stat-card">

              <h3>Completed</h3>

              <h2>
                {tasks.filter(
                  task => task.status === "Completed"
                ).length}
              </h2>

            </div>


            <div className="stat-card">

              <h3>In Progress</h3>

              <h2>
                {tasks.filter(
                  task => task.status === "In Progress"
                ).length}
              </h2>

            </div>


            <div className="stat-card">

              <h3>Overdue</h3>

              <h2>
                {
                  tasks.filter(task => {

                    if (!task.date) {
                      return false
                    }

                    const today = new Date()
                    today.setHours(0, 0, 0, 0)

                    const taskDate = new Date(task.date)
                    taskDate.setHours(0, 0, 0, 0)

                    return taskDate < today

                  }).length
                }
              </h2>

            </div>


          </div>


          <div className="recent-tasks">

            <h2>Recent Tasks</h2>


            {tasks.length === 0 ? (

              <p>No recent tasks.</p>

            ) : (

              tasks.map((task, index) => (

                <div className="task" key={index}>

                  <div>

                    <h3>{task.name}</h3>

                    <p>{task.project}</p>

                  </div>

                  <span>{task.status}</span>

                </div>

              ))

            )}

          </div>


          <div className="project-progress">

            <h2>Project Progress</h2>


            {tasks.length === 0 ? (

              <p>No projects yet.</p>

            ) : (

              [...new Set(
                tasks.map(task => task.project)
              )].map((project, index) => {

                const projectTasks = tasks.filter(
                  task => task.project === project
                )

                const completedTasks = projectTasks.filter(
                  task => task.status === "Completed"
                ).length

                const progress = Math.round(
                  (completedTasks / projectTasks.length) * 100
                )


                return (

                  <div className="project" key={index}>


                    <div className="project-info">

                      <h3>{project}</h3>

                      <span>{progress}%</span>

                    </div>


                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${progress}%`
                        }}
                      ></div>

                    </div>

                  </div>

                )

              })

            )}

          </div>


          <div className="deadlines">

            <h2>Upcoming Deadlines</h2>

            {upcomingTasks.length === 0 ? (

              <p>No upcoming deadlines.</p>

            ) : (

              upcomingTasks.map((task, index) => (

                <div className="deadline" key={index}>

                  <div>

                    <h3>{task.name}</h3>

                    <p>{task.project}</p>

                  </div>

                  <span>{task.date}</span>

                </div>

              ))

            )}

          </div>


        </div>


      ) : page === "My Tasks" ? (

        <MyTasks
          tasks={tasks}
          setTasks={setTasks}
        />


      ) : page === "Calendar" ? (

        <Calendar
          tasks={tasks}
          setTasks={setTasks}
        />


      ) : page === "Reports" ? (

        <Reports tasks={tasks} />

      ) : page === "Settings" ? (

        <Settings
          theme={theme}
          setTheme={setTheme}
          setIsLoggedIn={setIsLoggedIn}
        />

      ) : (

        <></>

      )}


    </div>

  )
}

export default ActualThing

