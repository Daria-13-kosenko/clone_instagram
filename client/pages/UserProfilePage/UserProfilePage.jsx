import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/AppLayout/AppLayout.jsx'
import PostModal from '../PostModal/PostModal.jsx'
import { getMyProfile } from '../../src/api/userApi.js'
import {
  followUser,
  getUserPosts,
  getUserProfile,
  unfollowUser,
} from '../../src/api/profileApi.js'
import { createOrGetConversation } from '../../src/api/messageApi.js'
import styles from './UserProfilePage.module.css'

const UserProfilePage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(null)
  const [profileUser, setProfileUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const me = await getMyProfile()
        setCurrentUser(me)

        const userData = await getUserProfile(userId)
        setProfileUser(userData)

        const postsData = await getUserPosts(userId)
        setPosts(Array.isArray(postsData) ? postsData : postsData.posts || [])

        setIsFollowing(Boolean(userData.isFollowing))
      } catch (error) {
        console.error(error)
      }
    }
    loadPage()
  }, [userId])

  const isMyProfile = useMemo(() => {
    return (
      currentUser &&
      profileUser &&
      String(currentUser._id) === String(profileUser._id)
    )
  }, [currentUser, profileUser])

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(profileUser._id)
        setIsFollowing(false)
        setProfileUser((prev) => ({
          ...prev,
          followersCount: Math.max((prev.followersCount || 1) - 1, 0),
        }))
      } else {
        await followUser(profileUser._id)
        setIsFollowing(true)
        setProfileUser((prev) => ({
          ...prev,
          followersCount: (prev.followersCount || 0) + 1,
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleMessage = async () => {
    try {
      await createOrGetConversation(profileUser._id)
      navigate('/message')
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenModal = (post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const handleDelete = (post) => {
    console.log('delete post', post)
  }

  const handleEdit = (post) => {
    console.log('go to post', post)
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

  if (!profileUser) {
    return (
      <AppLayout>
        <div className={styles.loading}>User not found</div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            {profileUser.avatar ? (
              <img
                src={profileUser.avatar}
                alt={profileUser.username}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {profileUser.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.topRow}>
              <h1 className={styles.username}>{profileUser.username}</h1>

              {!isMyProfile && (
                <div className={styles.actions}>
                  <button
                    className={
                      isFollowing ? styles.followingBtn : styles.followBtn
                    }
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>

                  <button className={styles.messageBtn} onClick={handleMessage}>
                    Message
                  </button>
                </div>
              )}
            </div>

            <div className={styles.stats}>
              <p>
                <strong>{posts.length}</strong> posts
              </p>
              <p>
                <strong>{profileUser.followersCount || 0}</strong> followers
              </p>
              <p>
                <strong>{profileUser.followingCount || 0}</strong> following
              </p>
            </div>

            <div className={styles.bioBlock}>
              <p className={styles.name}>
                {profileUser.fullName || profileUser.username}
              </p>
              <p className={styles.bio}>{profileUser.bio}</p>
              {profileUser.website && (
                <a
                  href={
                    profileUser.website.startsWith('http')
                      ? profileUser.website
                      : `http://${profileUser.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className={styles.website}
                >
                  {profileUser.website}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <div
              key={post._id}
              className={styles.postCard}
              onClick={() => handleOpenModal(post)}
            >
              <img
                src={post.image}
                alt={post.caption || 'post'}
                className={styles.postImage}
              />
            </div>
          ))}
        </div>
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
    </AppLayout>
  )
}

export default UserProfilePage
