import React from 'react'
import './Pricing.css'

const Pricing = () => {
  return (
    <div className='pricing' id='pricing'>
      <h1>SIMPLE PRICING FOR EVERYONE</h1>
      <div className='divs'>
        <div className='p'>

            <h1>Basic Plan</h1>
            <h2>$30.00 <span>USD/quarter</span></h2>
            <button>Subscribe</button>
            <hr />

            <ul>
              <li>Up to 5 projects</li>
              <li>Up to 50 tasks</li>
              <li>Basic task management</li>
              <li>Task priorities</li>
              <li>Basic progress tracking</li>
              <li>Due dates</li>
            </ul>
        </div>
        <div className='p'>

          <h1>Pro Plan</h1>
          <h2>$60.00 <span>USD/quarter</span></h2>
          <button>Subscribe</button>
          <hr />

          <ul>
            <li>Unlimited projects</li>
            <li>Unlimited tasks</li>
            <li>Advanced task management</li>
            <li>Priority levels</li>
            <li>Deadline reminders</li>
            <li>Calendar view</li>
            <li>Personal productivity insights</li>
          </ul>
        </div>
        <div className='p'>


          <h1>Expert Plan</h1>
          <h2>$150.00 <span>USD/quarter</span></h2>
          <button>Subscribe</button>
          <hr />


          <ul>
              <li>Unlimited projects</li>
              <li>Unlimited tasks</li>
              <li>Advanced task management</li>
              <li>Priority levels</li>
              <li>Deadline reminders</li>
              <li>Progress tracking</li>
              <li>Task search & filtering</li>
              <li>Calendar view</li>
              <li>Personal productivity insights</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Pricing
