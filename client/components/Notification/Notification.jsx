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
        setNotifications(data)
      } catch (error) {
        console.log(error)
      }
    }

    loadNotifications()
  }, [isOpen])

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
          <strong>{item.sender?.username}</strong> commented: "
          {item.commentText}"
        </>
      )
    }

    if (item.type === 'follow') {
      return (
        <>
          <strong>{item.sender?.username}</strong> started following you.
        </>
      )
    }

    return null
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
                <img
                  src={item.sender?.avatar || 'https://via.placeholder.com/44'}
                  alt={item.sender?.username || 'user'}
                  className={styles.avatar}
                />

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
