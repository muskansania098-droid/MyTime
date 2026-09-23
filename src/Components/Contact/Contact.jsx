import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className='contact' id='contact'>

      <h1>CONTACT US</h1>

      <p className='contact-intro'>
        Have a question or need help? We'd love to hear from you.
      </p>

      <div className='contact-container'>

        <div className='contact-info'>

          <h2>Get In Touch</h2>

          <p>
            We're here to help you get the most out of TaskFlow.
            Send us a message and our team will get back to you.
          </p>

          <div className='info-item'>
            <h3>📧 Email</h3>
            <p>support@taskflow.com</p>
          </div>

          <div className='info-item'>
            <h3>📞 Phone</h3>
            <p>+92 300 1234567</p>
          </div>

          <div className='info-item'>
            <h3>📍 Address</h3>
            <p>Peshawar, Pakistan</p>
          </div>

        </div>


        <div className='contact-form'>

          <h2>Send Us A Message</h2>

          <input
            type='text'
            placeholder='Your Name'
          />

          <input
            type='email'
            placeholder='Your Email'
          />

          <input
            type='text'
            placeholder='Subject'
          />

          <textarea
            placeholder='Your Message'
            rows='6'
          ></textarea>

          <button>Send Message</button>

        </div>

      </div>

    </div>
  )
}

export default Contact
