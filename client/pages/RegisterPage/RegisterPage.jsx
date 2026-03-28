import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../../src/api/authApi'
import { useAuth } from '../../context/AuthContext'
import styles from './RegisterPage.module.css'
import Ichgra from '../../src/assets/img/Ichra.svg'

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSumbit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await registerUser(formData)
      login(data.token)
      navigate('/profile')
    } catch (error) {
      setError(error.response?.data?.message || 'Sign up failed')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.registerCard}>
        <img className={styles.logo} src={Ichgra} alt="Ichgram logo" />

        <p className={styles.subtitle}>
          Sign up to see photos and videos
          <br />
          from your friends.
        </p>

        <form className={styles.form} onSubmit={handleSumbit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <p className={styles.infoText}>
            People who use our service may have uploaded your contact
            information to Instagram. <a href="#">Learn More</a>
          </p>

          <p className={styles.policyText}>
            By signing up, you agree to our <a href="#">Terms</a>,{' '}
            <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
          </p>

          <button type="submit">Sign up</button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.loginCard}>
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
