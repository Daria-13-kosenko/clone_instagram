import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage.jsx'
import LoginPage from '../pages/LoginPage/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx'
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPassword.jsx'

const AppRouter = () => {
  const { user } = useAuth()
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/profile" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  )
}

export default AppRouter
