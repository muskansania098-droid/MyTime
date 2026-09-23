
import React, { useState } from 'react'
import './Settings.css'

const Settings = ({ theme, setTheme, setIsLoggedIn }) => {

  const [name, setName] = useState(
    localStorage.getItem("taskflowName") || ""
  )

  const [email, setEmail] = useState(
    localStorage.getItem("taskflowEmail") || ""
  )

  const [notifications, setNotifications] = useState(
    localStorage.getItem("taskflowNotifications") !== "false"
  )

  const [saved, setSaved] = useState(false)

  const [selectedTheme, setSelectedTheme] = useState(theme)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [passwordError, setPasswordError] = useState("")
  const [passwordSaved, setPasswordSaved] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)


  const saveChanges = () => {

    localStorage.setItem("taskflowName", name)
    localStorage.setItem("taskflowEmail", email)

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)

  }


  const savePreferences = () => {

    localStorage.setItem(
      "taskflowNotifications",
      notifications
    )

  }


  const saveAppearance = () => {

    setTheme(selectedTheme)

    localStorage.setItem(
      "taskflowTheme",
      selectedTheme
    )

  }


  const changePassword = () => {

    setPasswordError("")
    setPasswordSaved(false)

    const savedUser = localStorage.getItem("taskflowUser")

    if (!savedUser) {
      setPasswordError("No account found")
      return
    }

    const user = JSON.parse(savedUser)

    if (currentPassword !== user.password) {
      setPasswordError("Current password is incorrect")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    const updatedUser = {
      ...user,
      password: newPassword
    }

    localStorage.setItem(
      "taskflowUser",
      JSON.stringify(updatedUser)
    )

    setPasswordSaved(true)

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

    setTimeout(() => {
      setPasswordSaved(false)
    }, 3000)

  }


  const deleteAccount = () => {

    const deletionDate =
      Date.now() + (30 * 24 * 60 * 60 * 1000)

    localStorage.setItem(
      "taskflowDeletionDate",
      deletionDate
    )

    localStorage.setItem(
      "taskflowAccountScheduledForDeletion",
      "true"
    )

    localStorage.removeItem("taskflowLoggedIn")

    setIsLoggedIn(false)

    window.location.replace("/")

  }


  const deleteAccountNow = () => {

    const userEmail = localStorage.getItem("taskflowEmail")

    const taskStorageKey = `taskflowTasks_${userEmail}`

    localStorage.removeItem("taskflowUser")

    localStorage.removeItem("taskflowName")
    localStorage.removeItem("taskflowEmail")

    localStorage.removeItem("taskflowNotifications")
    localStorage.removeItem("taskflowTheme")

    localStorage.removeItem("taskflowLoggedIn")

    localStorage.removeItem("taskflowAccountScheduledForDeletion")
    localStorage.removeItem("taskflowDeletionDate")

    localStorage.removeItem(taskStorageKey)

    setIsLoggedIn(false)

    window.location.replace("/")

  }


  return (
    <div className="right">

      <div className="dashboard-header">

        <h1>Settings</h1>

        <p>
          Manage your account and application settings.
        </p>

      </div>


      <div className="settings-section">

        <h2>Appearance</h2>

        <div className="settings-field">

          <label>Theme</label>

          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>

        </div>


        <button
          className="save-settings"
          onClick={saveAppearance}
        >
          Save Appearance
        </button>

      </div>


      <div className="settings-section">

        <h2>Notification Preferences</h2>

        <div className="notification-setting">

          <label>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />

            Email Notifications

          </label>


          <p>
            Receive notifications about your tasks and deadlines.
          </p>

        </div>


        <button
          className="save-settings"
          onClick={savePreferences}
        >
          Save Preferences
        </button>

      </div>


      <div className="settings-section">

        <h2>Security Settings</h2>


        <div className="settings-field">

          <label>Current Password</label>

          <div className="password-input">

            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
            >
              {showCurrentPassword ? "Hide" : "Show"}
            </button>

          </div>

        </div>


        <div className="settings-field">

          <label>New Password</label>

          <div className="password-input">

            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>

          </div>

        </div>


        <div className="settings-field">

          <label>Confirm New Password</label>

          <div className="password-input">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>

          </div>

        </div>


        {passwordError && (
          <p className="password-error">
            {passwordError}
          </p>
        )}


        <button
          className="save-settings"
          onClick={changePassword}
        >
          Change Password
        </button>


        {passwordSaved && (
          <p className="saved-message">
            Password changed successfully! 🔐
          </p>
        )}

      </div>


      <div className="settings-section danger-zone">

        <h2>Danger Zone</h2>


        <p>
          Your account will be scheduled for permanent deletion.
          You will have 30 days to recover your account before your
          account and saved data are permanently deleted.
        </p>


        {!showDeleteConfirm ? (

          <button
            className="delete-account"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>

        ) : (

          <div className="delete-confirm">

            <p>
              Are you sure you want to delete your account?
              You will have 30 days to recover it.
            </p>


            <div className="delete-buttons">

              <button
                className="cancel-delete"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>


              <button
                className="confirm-delete"
                onClick={deleteAccount}
              >
                Yes, Schedule Deletion
              </button>


              <button
                className="delete-now"
                onClick={deleteAccountNow}
              >
                Delete Account Now
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}

export default Settings

