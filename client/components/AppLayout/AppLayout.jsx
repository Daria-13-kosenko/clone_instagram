import Sidebar from '../Sidebar/Sidebar.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './AppLayout.module.css'
import CreatePostForm from '../CreatePostForm/CreatePostForm.jsx'
import { useState } from 'react'
import Notifications from '../Notification/Notification.jsx'

const AppLayout = ({ children, onPostCreated }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationtsOpen] = useState(false)

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
  }
  return (
    <div className={styles.wrapper}>
      <Sidebar
        handleOpen={handleOpenCreate}
        handleOpenNotifications={handleOpenNotifications}
        closeAllPanels={closeAllPanels}
        isNotificationsOpen={isNotificationsOpen}
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
    </div>
  )
}
export default AppLayout
