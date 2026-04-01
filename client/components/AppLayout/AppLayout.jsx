import Sidebar from '../Sidebar/Sidebar.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './AppLayout.module.css'
import CreatePostForm from '../CreatePostForm/CreatePostForm.jsx'
import { useState } from 'react'
import Notifications from '../Notification/Notification.jsx'
import Search from '../Search/Search.jsx'

const AppLayout = ({ children, onPostCreated }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationtsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleOpenCreate = () => {
    setIsCreateOpen(true)
  }
  const handleCloseCreate = () => {
    setIsCreateOpen(false)
  }

  const handleOpenNotifications = () => {
    setIsNotificationtsOpen((prev) => !prev)
    setIsCreateOpen(false)
  }

  const handleCloseNotifications = () => {
    setIsNotificationtsOpen(false)
  }
  const closeAllPanels = () => {
    setIsNotificationtsOpen(false)
    setIsCreateOpen(false)
    setIsSearchOpen(false)
  }

  const handleOpenSearch = () => {
    setIsSearchOpen((prev) => !prev)
    setIsNotificationtsOpen(false)
    setIsCreateOpen(false)
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar
        handleOpen={handleOpenCreate}
        handleOpenNotifications={handleOpenNotifications}
        closeAllPanels={closeAllPanels}
        isNotificationsOpen={isNotificationsOpen}
        isSearchOpen={isSearchOpen}
        handleOpenSearch={handleOpenSearch}
      />

      <div className={styles.contentArea}>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>

      <CreatePostForm
        isOpen={isCreateOpen}
        onClose={handleCloseCreate}
        onPostCreated={onPostCreated}
      />
      <Notifications
        isOpen={isNotificationsOpen}
        onClose={handleCloseNotifications}
      />
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
export default AppLayout
