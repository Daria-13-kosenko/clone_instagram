import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../../src/api/authApi.js'
import { useAuth } from '../../context/AuthContext.jsx'
import styles from './LoginPage.module.css'
import Telephone from '../../src/assets/img/Telephone1.svg'
import Ichgra from '../../src/assets/img/Ichra.svg'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await loginUser(formData)
      login(data.token)
      navigate('/profile')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_left}>
        <img src={Telephone} alt="Instagram preview" />
      </div>

      <div className={styles.login_right}>
        <div className={styles.loginBox}>
          <img className={styles.logo} src={Ichgra} alt="Ichgram logo" />

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Username, or email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit">Log in</button>
          </form>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.divider}>
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <a href="#" className={styles.forgotPassword}>
            Forgot password?
          </a>
        </div>

        <div className={styles.login_lower}>
          <p className={styles.signupText}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
