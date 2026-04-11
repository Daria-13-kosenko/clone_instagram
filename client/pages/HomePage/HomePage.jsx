import styles from './HomePage.module.css'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../src/api/postApi.js'
import PostCard from '../../components/PostCard/PostCard.jsx'
import PostModal from '../../pages/PostModal/PostModal.jsx'
import AppLayout from '../../components/AppLayout/AppLayout.jsx'
import { getMyProfile } from '../../src/api/userApi.js'
import AllTheUpdate from '../../src/assets/icons/allTheUpd.svg'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const loadPosts = async () => {
    try {
      const data = await getAllPosts()
      setPosts(Array.isArray(data) ? data : data.posts || [])
    } catch (error) {
      console.log(error)
      setPosts([])
    }
  }

  const loadCurrentUser = async () => {
    try {
      const data = await getMyProfile()
      setCurrentUser(data)
    } catch (error) {
      console.log(error)
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getAllPosts()
        setPosts(data)
      } catch (error) {
        console.error('Error loading posts:', error)
      }
    }

    loadPosts()
  }, [])

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev])
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
      console.log(error)
    }
  }

  return (
    <AppLayout onPostCreated={handlePostCreated}>
      <div className={styles.page}>
        <div className={styles.feed}>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>

      <div className={styles.bottomInfo}>
        <div className={styles.circle}>
          <img src={AllTheUpdate} alt="updates" />
        </div>
        <p className={styles.title}>You've seen all the updates</p>
        <p className={styles.text}>You have viewed all new publications</p>
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

export default HomePage
