import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links}>
        <a href="#">Home</a>
        <a href="#">Search</a>
        <a href="#">Explore</a>
        <a href="#">Message</a>
        <a href="#">Notification</a>
        <a href="#">Create</a>
      </nav>
      <p>© 2026 Ichgram</p>
    </footer>
  )
}
export default Footer
