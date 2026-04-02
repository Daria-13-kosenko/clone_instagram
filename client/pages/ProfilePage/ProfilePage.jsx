import { useEffect, useState } from 'react'
import styles from './ProfilePage.module.css'
import { getMyProfile } from '../../src/api/userApi.js'
import { getMyPosts } from '../../src/api/postApi.js'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getMyProfile()
        const postsData = await getMyPosts()

        setUser(profileData)
        setPosts(Array.isArray(postsData) ? postsData : postsData.posts || [])
      } catch (error) {
        console.log(error)
      }
    }
    loadProfile()
  }, [])

  if (!user) {
    return
  }

  return (
    <div className={styles.ProfilePage}>
      <div className={styles.header}>
        <div className={avatarWrapper}>
          <div className={styles.avatarRing}>
            <img
              src={user.avatar || 'http://via.placeholder.com/150'}
              alt={user.username}
              className={styles.avatar}
            />
          </div>
        </div>

        <div className={styles.info}>
          <div className></div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
