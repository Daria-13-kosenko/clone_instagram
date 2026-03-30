import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'
import Ichra from '../../src/assets/img/Ichra.svg'
import Home from '../../src/assets/icons/Home.svg'
import Search from '../../src/assets/icons/Search.svg'
import Explore from '../../src/assets/icons/Explore.svg'
import Message from '../../src/assets/icons/Messenger.svg'
import Notification from '../../src/assets/icons/Notification.svg'
import Create from '../../src/assets/icons/Create.svg'

const Sidebar = () => {
  const [collapsed, setCollapset] = useState(false)

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          {!collapsed && <img src={Ichra} alt="Logo" className={styles.logo} />}
          <button
            className={styles.toggleBtn}
            onClick={() => setCollapset(!collapsed)}
          >
            {collapsed ? '-' : '-'}
          </button>
        </div>
        <nav className={styles.nav}>
          <link to="/home">
            <img src={Home} alt="Home" />
            Home
          </link>
          <link to="/search">
            <img src={Search} alt="Search" />
            Search
          </link>
          <link to="/explore">
            <img src={Explore} alt="Explore" />
            Explore
          </link>
          <link to="message">
            <img src={Message} alt="Message" />
            Message
          </link>
          <link to="/notification">
            <img src={Notification} alt="Notification" />
            Notification
          </link>
          <link to="create">
            <img src={Create} alt="Create" />
            Create
          </link>
          <link to="/profile">
            <img />
            Profile
          </link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
