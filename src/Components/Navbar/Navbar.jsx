
import './Navbar.css'
import { Link as ScrollLink } from 'react-scroll'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const Navbar = ({ signIn, setSignIn, isLoggedIn, theme, setTheme }) => {

  const navigate = useNavigate()
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMode, setMobileMode] = useState(false)

  useEffect(() => {
    const checkNavbarWidth = () => {
      if (!navRef.current) return

      const navWidth = navRef.current.clientWidth

      if (navWidth < 1200) {
        setMobileMode(true)
      } else {
        setMobileMode(false)
        setMenuOpen(false)
      }
    }

    checkNavbarWidth()

    const observer = new ResizeObserver(checkNavbarWidth)

    if (navRef.current) {
      observer.observe(navRef.current)
    }

    window.addEventListener('resize', checkNavbarWidth)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkNavbarWidth)
    }
  }, [])

  const handleButtonClick = () => {
    const savedUser = localStorage.getItem("taskflowUser")

    if (isLoggedIn) {
      navigate("/actual")
    } else {
      setSignIn(true)

      if (savedUser) {
        // Login.jsx will open
        // We will tell it to show Log In
      }
    }

    setMenuOpen(false)
  }

  const handleThemeChange = () => {
    const newTheme = theme === "Light" ? "Dark" : "Light"

    setTheme(newTheme)
    localStorage.setItem("taskflowTheme", newTheme)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div
      ref={navRef}
      className={`navber ${theme === "Dark" ? "dark-navbar" : ""}`}
    >

      <h1
        className='my-h1-special'
        onClick={() => {
          navigate("/")
          closeMenu()
        }}
      >
        TaskFlow🪻
      </h1>

      {mobileMode && !menuOpen && (
        <div
          className="hamburger"
          onClick={() => setMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {!mobileMode && (
        <div className="mobile-menu desktop-menu">

          <ul className='list'>

            <Link className='link' to="/" onClick={closeMenu}>
              <li>Home</li>
            </Link>

            <ScrollLink
              to='features'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>Features</li>
            </ScrollLink>

            <ScrollLink
              to='pricing'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>Pricing</li>
            </ScrollLink>

            <ScrollLink
              to='about'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>About</li>
            </ScrollLink>

            <ScrollLink
              to='contact'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>Contact</li>
            </ScrollLink>

          </ul>

          <div className='last'>

            <div
              className='theme-toggle'
              onClick={handleThemeChange}
            >
              <i
                className={
                  theme === "Light"
                    ? "fa-solid fa-moon"
                    : "fa-solid fa-sun"
                }
              ></i>
            </div>

            <div
              className='last1'
              onClick={handleButtonClick}
            >
              Sign Up
            </div>

            <div
              className='last2'
              onClick={handleButtonClick}
            >
              Get Started
            </div>

          </div>
        </div>
      )}

      {mobileMode && menuOpen && (
        <div className="mobile-menu mobile-open-menu">

          <ul className='list'>

            <Link className='link' to="/" onClick={closeMenu}>
              <li>Home</li>
            </Link>

            <ScrollLink
              to='features'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>Features</li>
            </ScrollLink>

            <ScrollLink
              to='pricing'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>Pricing</li>
            </ScrollLink>

            <ScrollLink
              to='about'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>About</li>
            </ScrollLink>

            <ScrollLink
              to='contact'
              smooth={true}
              offset={-50}
              onClick={closeMenu}
            >
              <li>Contact</li>
            </ScrollLink>

          </ul>

          <div className='last'>

            <div
              className='theme-toggle'
              onClick={handleThemeChange}
            >
              <i
                className={
                  theme === "Light"
                    ? "fa-solid fa-moon"
                    : "fa-solid fa-sun"
                }
              ></i>
            </div>

            <div
              className='last1'
              onClick={handleButtonClick}
            >
              Sign Up
            </div>

            <div
              className='last2'
              onClick={handleButtonClick}
            >
              Get Started
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Navbar

