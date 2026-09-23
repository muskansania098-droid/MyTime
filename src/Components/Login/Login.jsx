import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'


const Login = ({ signIn, setSignIn, setIsLoggedIn, hasAccount }) => {

  const navigate = useNavigate()


  const [signLog, setSignLog] = useState(
    hasAccount ? "Log In" : "Sign Up"
  )


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [showRecovery, setShowRecovery] = useState(false)


  const handleSignUp = () => {

    setError("")
    setSuccess("")


    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Please fill in all fields")
      return
    }


    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }


    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }


    const user = {
      name: name,
      email: email,
      password: password
    }


    localStorage.setItem(
      "taskflowUser",
      JSON.stringify(user)
    )

    localStorage.setItem("taskflowName", name)
    localStorage.setItem("taskflowEmail", email)


    // New account should not be scheduled for deletion

    localStorage.removeItem(
      "taskflowAccountScheduledForDeletion"
    )

    localStorage.removeItem(
      "taskflowDeletionDate"
    )


    setSuccess("Account created successfully! 🎉")


    setName("")
    setEmail("")
    setPassword("")


    setTimeout(() => {

      setSignLog("Log In")
      setSuccess("")

    }, 1000)

  }


  const handleLogin = () => {

    setError("")
    setSuccess("")


    if (
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Please enter your email and password")
      return
    }


    const savedUser = localStorage.getItem("taskflowUser")


    if (!savedUser) {
      setError("No account found. Please sign up first")
      return
    }


    const user = JSON.parse(savedUser)


    if (
      email !== user.email ||
      password !== user.password
    ) {
      setError("Incorrect email or password")
      return
    }


    /*
      Check if this account is scheduled
      for deletion.
    */

    const scheduled =
      localStorage.getItem(
        "taskflowAccountScheduledForDeletion"
      ) === "true"


    const deletionDate = Number(
      localStorage.getItem("taskflowDeletionDate")
    )


    if (scheduled && deletionDate) {

      /*
        The 30-day period is still active.
      */

      if (Date.now() < deletionDate) {

        setShowRecovery(true)

        return

      }


      /*
        The 30 days have passed.
        Permanently remove the account.
      */

      const taskStorageKey =
        `taskflowTasks_${user.email}`


      localStorage.removeItem("taskflowUser")
      localStorage.removeItem("taskflowName")
      localStorage.removeItem("taskflowEmail")
      localStorage.removeItem("taskflowNotifications")
      localStorage.removeItem("taskflowTheme")
      localStorage.removeItem("taskflowLoggedIn")
      localStorage.removeItem("taskflowAccountScheduledForDeletion")
      localStorage.removeItem("taskflowDeletionDate")
      localStorage.removeItem(taskStorageKey)


      setError(
        "Your account deletion period has ended. Please create a new account."
      )

      setSignLog("Sign Up")

      setName("")
      setEmail("")
      setPassword("")

      return

    }


    /*
      Normal login.
    */

    localStorage.setItem(
      "taskflowLoggedIn",
      "true"
    )

    setIsLoggedIn(true)


    setSuccess("Login successful! 🎉")


    setTimeout(() => {

      setSignIn(false)
      navigate("/actual")

    }, 700)

  }


  const restoreAccount = () => {

    localStorage.removeItem(
      "taskflowAccountScheduledForDeletion"
    )

    localStorage.removeItem(
      "taskflowDeletionDate"
    )


    localStorage.setItem(
      "taskflowLoggedIn",
      "true"
    )


    setIsLoggedIn(true)

    setSuccess("Your account has been restored! 🎉")


    setTimeout(() => {

      setShowRecovery(false)
      setSignIn(false)
      navigate("/actual")

    }, 700)

  }


  return (
    <div className='signUp'>

      <div className='inner-div'>

        <div className='h1-div'>

          <h1>
            {showRecovery
              ? "Restore Account"
              : signLog === "Sign Up"
                ? "Sign Up"
                : "Log In"
            }
          </h1>


          <span
            onClick={() => {
              setSignIn(false)
            }}
          >
            x
          </span>

        </div>


        {showRecovery ? (

          <div className="recovery-box">

            <p>
              Your account is scheduled for deletion.
            </p>

            <p>
              Your account and saved tasks are still available
              for recovery.
            </p>

            <p>
              Restore your account to continue using TaskFlow.
            </p>


            <button onClick={restoreAccount}>
              Restore Account
            </button>


            <button
              className="cancel-delete"
              onClick={() => {
                setShowRecovery(false)
                setError("")
                setSuccess("")
              }}
            >
              Cancel
            </button>

          </div>

        ) : (

          <>

            <div className='inputs'>

              {signLog === "Sign Up" && (

                <input
                  type="text"
                  placeholder='Enter Your Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              )}


              <input
                type="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />


              <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>


            {error && (
              <p style={{ color: "red" }}>
                {error}
              </p>
            )}


            {success && (
              <p style={{ color: "green" }}>
                {success}
              </p>
            )}


            {signLog === "Sign Up" ? (

              <p>

                Already have an account?

                <span
                  onClick={() => {

                    setSignLog("Log In")
                    setError("")
                    setSuccess("")

                  }}
                >
                  Click Here
                </span>

              </p>

            ) : (

              <p>

                Create a new account:

                <span
                  onClick={() => {

                    setSignLog("Sign Up")
                    setError("")
                    setSuccess("")

                  }}
                >
                  Click Here
                </span>

              </p>

            )}


            {signLog === "Sign Up" ? (

              <button onClick={handleSignUp}>
                Sign Up
              </button>

            ) : (

              <button onClick={handleLogin}>
                Log In
              </button>

            )}

          </>

        )}

      </div>

    </div>
  )
}

export default Login