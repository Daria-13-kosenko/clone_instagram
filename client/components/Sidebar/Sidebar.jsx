import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'
import Ichra from '../../src/assets/img/Ichra.svg'
import Home from '../../src/assets/icons/Home.svg'
import Search from '../../src/assets/icons/Search.svg'
import Explore from '../../src/assets/icons/Explore.svg'
import Message from '../../src/assets/icons/Messenger.svg'
import Notification from '../../src/assets/icons/Notification.svg'
import Create from '../../src/assets/icons/Create.svg'
import { useEffect, useState } from 'react'

const Sidebar = ({
  handleOpen,
  handleOpenNotifications,
  isNotificationsOpen,
  closeAllPanels,
  isSearchOpen,
  handleOpenSearch,
}) => {
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user')

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log(error)
        setUser(null)
      }
    }

    loadUser()

    window.addEventListener('storage', loadUser)
    window.addEventListener('userUpdated', loadUser)

    return () => {
      window.removeEventListener('storage', loadUser)
      window.removeEventListener('userUpdated', loadUser)
    }
  }, [])

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

          <button
            type="button"
            className={`${styles.navItemButton} ${isSearchOpen ? styles.active : ''}`}
            onClick={handleOpenSearch}
          >
            <img src={Search} alt="Search" />
            <span>Search</span>
          </button>

          <Link
            to="/explore"
            className={`${styles.navItem} ${
              location.pathname === '/explore' ? styles.active : ''
            }`}
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
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt={user?.username || 'Profile'}
              className={styles.profileAvatar}
            />

            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
