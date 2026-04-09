import { useEffect, useState } from 'react'
import { getMyNotifications } from '../../src/api/notificationApi.js'
import styles from './Notification.module.css'

const Notifications = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (!isOpen) return

    const loadNotifications = async () => {
      try {
        const data = await getMyNotifications()
        setNotifications(Array.isArray(data) ? data : data.notifications || [])
      } catch (error) {
        console.log(error)
        setNotifications([])
      }
    }

    loadNotifications()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const renderText = (item) => {
    if (item.type === 'like') {
      return (
        <>
          <strong>{item.sender?.username}</strong> liked your photo.
        </>
      )
    }

    if (item.type === 'comment') {
      return (
        <>
          <strong>{item.sender?.username || 'User'}</strong> commented: "
          {item.comment?.text || item.commentText || 'Nice post'}"
        </>
      )
    }

    if (item.type === 'follow') {
      return (
        <>
          <strong>{item.sender?.username || 'User'}</strong> started following
          you.
        </>
      )
    }

    return null
  }

  const renderAvatar = (item) => {
    if (item.sender?.avatar) {
      return (
        <img
          src={item.sender.avatar}
          alt={item.sender?.username || 'user'}
          className={styles.avatar}
        />
      )
    }
    return (
      <div className={styles.avatarPlaceholder}>
        {item.sender?.username?.charAt(0)?.toUpperCase() || 'U'}
      </div>
    )
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.panel}>
        <h2 className={styles.title}>Notifications</h2>

        {notifications.length === 0 ? (
          <p className={styles.empty}>No notifications yet</p>
        ) : (
          <div className={styles.list}>
            {notifications.map((item) => (
              <div key={item._id} className={styles.item}>
                {renderAvatar(item)}

                <div className={styles.text}>
                  <p>{renderText(item)}</p>
                </div>

                {item.post?.image ? (
                  <img
                    src={item.post.image}
                    alt="post"
                    className={styles.postPreview}
                  />
                ) : (
                  <div className={styles.emptyPreview}></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Notifications
