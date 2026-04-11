import AppLayout from '../../components/AppLayout/AppLayout.jsx'
import Telephone from '../../src/assets/img/Telephone1.svg'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.content}>
          <img src={Telephone} alt="Telephone" className={styles.image} />

          <div className={styles.textBlock}>
            <h1 className={styles.title}>Oops! Page Not Found (404 Error)</h1>
            <p className={styles.text}>
              We're sorry, but the page you're looking for doesn't seem to
              exist.
            </p>
            <p className={styles.text}>
              If you typed the URL manually, please double-check the spelling.
              If you clicked on a link, it may be outdated or broken.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default NotFoundPage
