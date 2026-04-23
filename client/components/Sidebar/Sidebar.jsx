import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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

  const profileContent = user?.avatar ? (
    <img
      src={user.avatar}
      alt={user?.username || 'Profile'}
      className={styles.profileAvatar}
    />
  ) : (
    <div className={styles.profileCircle}>
      {user?.username?.[0]?.toUpperCase() || 'U'}
    </div>
  )

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    window.dispatchEvent(new Event('userUpdated'))
    navigate('/login')
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <img src={Ichra} alt="Logo" className={styles.logo} />
        </div>

        <nav className={styles.nav}>
          <Link
            to="/home"
            className={`${styles.navItem} ${
              location.pathname === '/home' ? styles.active : ''
            }`}
            onClick={closeAllPanels}
          >
            <img src={Home} alt="Home" />
            <span>Home</span>
          </Link>

          <button
            type="button"
            className={`${styles.navItemButton} ${
              isSearchOpen ? styles.active : ''
            }`}
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
            className={`${styles.navItem} ${
              location.pathname === '/message' ? styles.active : ''
            }`}
            onClick={closeAllPanels}
          >
            <img src={Message} alt="Message" />
            <span>Messages</span>
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
          <br />
          <Link
            to="/profile"
            className={`${styles.navItem} ${
              location.pathname === '/profile' ? styles.active : ''
            }`}
            onClick={closeAllPanels}
          >
            {profileContent}
            <span>Profile</span>
          </Link>
          <br />
          <br />

          <button
            type="button"
            className={styles.navItem}
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
