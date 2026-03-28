import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import { useAuth } from '../context/AuthContext'

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
    </Routes>
  )
}

export default AppRouter
