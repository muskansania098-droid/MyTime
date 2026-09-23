import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import { useState } from 'react'
import ActualThing from './ActualThing/Dashboard/ActualThing'


const App = () => {

  const [signIn, setSignIn] = useState(false)

  const [theme, setTheme] = useState(
    localStorage.getItem("taskflowTheme") || "Light"
  )

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("taskflowLoggedIn") === "true"
  )


  return (
    <>


    <Navbar
      signIn={signIn}
      setSignIn={setSignIn}
      isLoggedIn={isLoggedIn}
      theme={theme}
      setTheme={setTheme}
    />



      {signIn === true ? (
        <Login
          signIn={signIn}
          setSignIn={setSignIn}
          setIsLoggedIn={setIsLoggedIn}
          hasAccount={localStorage.getItem("taskflowUser") !== null}
        />
      ) : (
        <></>
      )}



      <div className={`app ${theme === "Dark" ? "dark-mode" : ""}`}>



  


        <Routes>

          <Route
            path='/'
            element={<Home />}
          />


          <Route
            path='/actual'
            element={
              isLoggedIn
                ? (
                  <ActualThing
                    setIsLoggedIn={setIsLoggedIn}
                    theme={theme}
                    setTheme={setTheme}
                  />
                )
                : <Navigate to='/' />
            }
          />

        </Routes>

      </div>

    </>
  )
}

export default App

