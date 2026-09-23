import React, { useState } from 'react'
import './Calendar.css'

const Calendar = ({ tasks, setTasks }) => {

  const [currentDate, setCurrentDate] = useState(new Date());   

  const [selectedTask, setSelectedTask] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString('default', {
    month: 'long'
  })


  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }


  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }


  const today = new Date()


  const getTasksForDay = (day) => {

    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    return tasks.filter(task => task.date === date)

  }


  return (

    <div className="calendar">

      <div className="calendar-header">

        <h1>Calendar</h1>

        <p>View and manage your task deadlines.</p>

      </div>


      <div className="calendar-box">

        <div className="calendar-top">

          <button onClick={previousMonth}>
            ←
          </button>

          <h2>
            {monthName} {year}
          </h2>

          <button onClick={nextMonth}>
            →
          </button>

        </div>


        <div className="calendar-days">

          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>

        </div>


        <div className="calendar-dates">

          {Array.from({ length: firstDay }).map((_, index) => (

            <div
              className="calendar-date empty"
              key={`empty-${index}`}
            ></div>

          ))}


          {Array.from({ length: daysInMonth }).map((_, index) => {

            const day = index + 1

            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()

            const dayTasks = getTasksForDay(day)


            return (

              <div
                className={`calendar-date ${isToday ? 'today' : ''}`}
                key={day}
              >

                <div className="date-number">
                  {day}
                </div>


                <div className="calendar-tasks">

                  {dayTasks.map((task, index) => (

                    <div
                      className="calendar-task"
                      key={index}
                      onClick={() => setSelectedTask(task)}
                    >
                      {task.name}
                    </div>

                  ))}

                </div>

              </div>

            )

          })}

        </div>


        {selectedTask && (

          <div className="task-details">

            <h2>Task Details</h2>

            <p>
              <strong>Task:</strong> {selectedTask.name}
            </p>

            <p>
              <strong>Project:</strong> {selectedTask.project}
            </p>

            <p>
              <strong>Priority:</strong> {selectedTask.priority}
            </p>

            <p>
              <strong>Status:</strong> {selectedTask.status}
            </p>

            <p>
              <strong>Deadline:</strong> {selectedTask.date}
            </p>


            <div className="task-detail-buttons">

            <button
              onClick={() => setSelectedTask(null)}
            >
              Close
            </button>

            <button
              onClick={() => {

                setTasks(
                  tasks.filter(task => task !== selectedTask)
                )

                setSelectedTask(null)

              }}
            >
              Delete
            </button>

          </div>
            

          </div>

        )}

      </div>

    </div>

  )
}

export default Calendar

