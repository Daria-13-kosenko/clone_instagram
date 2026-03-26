import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Homepage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="register/" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
