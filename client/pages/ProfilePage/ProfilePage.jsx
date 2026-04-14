import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProfilePage.module.css'
import { getMyProfile } from '../../src/api/userApi.js'
import { getMyPosts } from '../../src/api/postApi.js'
import PostModal from '../PostModal/PostModal.jsx'
import { deletePost } from '../../src/api/postApi.js'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  const handleOpenModal = (post) => {
    setSelectedPost(post)
  }
  const handleCloseModal = () => {
    setSelectedPost(null)
  }
  const handleEdit = (post) => {
    console.log('edit post', post)
  }
  const handleGoToPost = (post) => {
    console.log('go to post', post)
  }
  const handleCopyLink = async (post) => {
    try {
      const link = `${window.location.origin}/posts/${post._id}`
      await navigator.clipboard.writeText(link)
      alert('Link copied')
    } catch (error) {
      console.error(error)
    }
  }
  const handleDelete = async (post) => {
    try {
      await deletePost(post._id)
      setPosts((prev) => prev.filter((item) => item._id !== post._id))

      handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }
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
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing}>
            <img
              src={user.avatar || 'http://via.placeholder.com/150'}
              alt={user.username}
              className={styles.avatar}
            />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>{user.username}</h2>
            <Link to="/profile/edit" className={styles.editButton}>
              Edit profile
            </Link>
          </div>

          <div className={styles.stats}>
            <p>
              <strong>{posts.length}</strong>posts
            </p>
            <p>
              <strong>{user.followersCount || 0}</strong>followers
            </p>
            <p>
              <strong>{user.followingCount || 0}</strong>following
            </p>
          </div>

          <div className={styles.bio}>
            <p className={styles.fullName}>{user.fullName || ''}</p>
            <p>{user.bio || ''}</p>
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {user.website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.activeTab}`}>POSTS</button>
      </div>

      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <div
            key={post._id}
            className={styles.postCard}
            onClick={() => handleOpenModal(post)}
          >
            <img src={post.image} alt={post.caption || 'post'} />
          </div>
        ))}
      </div>
      {selectedPost && (
        <PostModal
          post={selectedPost}
          currentUser={currentUser}
          onClose={handleCloseModal}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onGoToPost={handleGoToPost}
          onCopyLink={handleCopyLink}
        />
      )}
    </div>
  )
}

export default ProfilePage
