
import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='hero' id='hero'>

      <div className='hero-left'>

        <h1>Work Smarter</h1>

        <h2>Get More Done</h2>

        <p>
          TaskFlow helps you organize your tasks, manage projects,
          and stay on top of your work.
        </p>

        
          <button>See Preview</button>
        

      </div>

    </div>
  )
}

export default Hero
