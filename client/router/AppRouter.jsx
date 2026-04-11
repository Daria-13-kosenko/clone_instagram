import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage.jsx'
import LoginPage from '../pages/LoginPage/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx'
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPassword.jsx'
import AppLayout from '../components/AppLayout/AppLayout.jsx'
import ExplorePage from '../pages/ExplorePage/ExplorePage.jsx'
import EditProfile from '../pages/EditProfilePage/EditProfile.jsx'
import MessagePage from '../pages/MessagePage/MessagePage.jsx'
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage.jsx'

const AppRouter = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route
        path="/home"
        element={user ? <HomePage /> : <Navigate to="/login" />}
      />

      <Route
        path="/profile"
        element={
          user ? (
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/explore"
        element={
          user ? (
            <AppLayout>
              <ExplorePage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/message"
        element={
          user ? (
            <AppLayout>
              <MessagePage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/profile/edit"
        element={
          user ? (
            <AppLayout>
              <EditProfile />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/profile/:userId" element={<UserProfilePage />} />
    </Routes>
  )
}

export default AppRouter
