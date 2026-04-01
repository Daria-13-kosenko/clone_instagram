import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'
import Ichra from '../../src/assets/img/Ichra.svg'
import Home from '../../src/assets/icons/Home.svg'
import Search from '../../src/assets/icons/Search.svg'
import Explore from '../../src/assets/icons/Explore.svg'
import Message from '../../src/assets/icons/Messenger.svg'
import Notification from '../../src/assets/icons/Notification.svg'
import Create from '../../src/assets/icons/Create.svg'

const Sidebar = ({
  handleOpen,
  handleOpenNotifications,
  isNotificationsOpen,
  closeAllPanels,
}) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <img src={Ichra} alt="Logo" className={styles.logo} />
        </div>

        <nav className={styles.nav}>
          <Link to="/home" className={styles.navItem} onClick={closeAllPanels}>
            <img src={Home} alt="Home" />
            <span>Home</span>
          </Link>

          <Link
            to="/search"
            className={styles.navItem}
            onClick={closeAllPanels}
          >
            <img src={Search} alt="Search" />
            <span>Search</span>
          </Link>

          <Link
            to="/explore"
            className={styles.navItem}
            onClick={closeAllPanels}
          >
            <img src={Explore} alt="Explore" />
            <span>Explore</span>
          </Link>

          <Link
            to="/message"
            className={styles.navItem}
            onClick={closeAllPanels}
          >
            <img src={Message} alt="Message" />
            <span>Message</span>
          </Link>

          <button
            type="button"
            className={`${styles.navItemButton} ${
              isNotificationsOpen ? styles.active : ''
            }`}
            onClick={handleOpenNotifications}
          >
            <img src={Notification} alt="Notifications" />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            className={styles.navItemButton}
            onClick={handleOpen}
          >
            <img src={Create} alt="Create" />
            <span>Create</span>
          </button>

          <Link
            to="/profile"
            className={styles.navItem}
            onClick={closeAllPanels}
          >
            <span className={styles.profileCircle}></span>
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
