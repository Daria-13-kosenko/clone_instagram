import Sidebar from '../Sidebar/Sidebar.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentArea}>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
export default AppLayout
