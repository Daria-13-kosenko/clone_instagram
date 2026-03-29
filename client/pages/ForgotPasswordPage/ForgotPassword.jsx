import { Link } from 'react-router-dom'
import styles from './ForgetPasswor.module.css'
import Ichgra from '../../src/assets/img/Ichra.svg'
import Trable from '../../src/assets/icons/Trable.svg'

const ForgotPasswordPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src={Ichgra} alt="Logo" className={styles.headerLogo} />
      </header>

      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <img src={Trable} alt="trable icon" />
          <div className={styles.lockBody}></div>
          <div className={styles.lockTop}></div>
        </div>

        <h1 className={styles.title}>Trouble logging in?</h1>
        <p className={styles.description}>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>

        <form className={styles.form}>
          <input type="text" placeholder="Email or Username" />
          <button type="submit">Reset your password</button>
        </form>

        <div className={styles.divider}>
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        <Link to="/register" className={styles.createAccount}>
          Create new account
        </Link>
        <Link to="/login" className={styles.backLogin}>
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
