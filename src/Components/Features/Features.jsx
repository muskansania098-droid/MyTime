import React from 'react'
import './Features.css'

const Features = () => {
  return (
    <div className='features' id='features'>
        <h1 className='title'>OUR FEATURES</h1>
        <div className='wrapper'>
            <div>
            <h2><i className="fa-solid fa-list-check"></i></h2>
            <h1>Task Management</h1>
            <p>We ensure your tasks are managed exactly the way you want</p>
            </div>

            <div>
                <h2><i className="fa-solid fa-diagram-project"></i></h2>
                <h1>Projects</h1>
                <p>Here are all your projects kept safe</p>
            </div>

            <div>
                <h2><i className="fa-brands fa-first-order"></i></h2>
                <h1>Priorities</h1>
                <p>The priorities you set are up to you</p>
            </div>

            <div>
                <h2><i className="fa-solid fa-calendar"></i></h2>
                <h1>Deadlines</h1>
                <p>Your deadlines must be set</p>
            </div>

            <div>
                <h2><i className="fa-solid fa-calendar"></i></h2>
                <h1>Progress</h1>
                <p>Progress are tracked without you being worried</p>
            </div>

            <div>
                <h2><i className="fa-solid fa-calendar"></i></h2>
                <h1>Team</h1>
                <p>Go and collaborate with your team</p>
            </div>
        </div>
        
      
    </div>
  )
}

export default Features
