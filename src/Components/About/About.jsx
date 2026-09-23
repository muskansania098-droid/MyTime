import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className='about' id='about'>

        <h1 className='about-title'>ABOUT US</h1>

        <div className='thing'>
            <div className='about-2'>
                <h1>ABOUT TASKFLOW</h1>
                <h2>We Make Work Simpler</h2>
                <p>
                    Stay organized, focused, and in control of your work.
                    Our task management system helps you manage projects,
                    set priorities, track progress, and meet deadlines with
                    ease and precious time
                </p>
            </div>

            <h1 className='h1'>OUR MISSION</h1>

            <p className='last-p'>
                Stay organized, focused, and in control of your work.
                Our task management system helps you manage projects,
                set priorities, track progress, and meet deadlines with ease
            </p>
        </div>

        <div className='divs'>
            <div className='user'>
                <h1>10K Users</h1>
                <h2>Active Users</h2>
            </div>

            <div className='user'>
                <h1>50K+</h1>
                <h2>Tasks Completed</h2>
            </div>

            <div className='user'>
                <h1>99%</h1>
                <h2>Customer Satisfaction</h2>
            </div>
        </div>

    </div>
  )
}

export default About

