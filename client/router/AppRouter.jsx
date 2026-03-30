import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage.jsx'
import LoginPage from '../pages/LoginPage/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx'
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPassword.jsx'
import AppLayout from '../components/AppLayout/AppLayout.jsx'

const AppContent = () => {
  const { user } = useAuth()
  const location = useLocation()

  const authPages = ['/login', '/register', '/forgot-password']
  const isAuthPage = authPages.includes(location.pathname)

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
        element={
          user ? (
            <AppLayout>
              <HomePage />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
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
    </Routes>
  )
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default AppRouter
