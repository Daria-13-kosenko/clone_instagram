import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../src/api/authApi'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSumbit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await registerUser(formData)
      login(data.token)
      navigate('/profile')
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={formData.fullName}
          onChange={handleChange}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default RegisterPage
