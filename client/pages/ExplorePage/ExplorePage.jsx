import { getExplorePosts } from '../../src/api/exploreApi'
import { useState, useEffect } from 'react'
import styles from './ExplorePage.module.css'
import PostModal from '../PostModal/PostModal.jsx'
import { getMyProfile } from '../../src/api/userApi.js'
import { deletePost } from '../../src/api/postApi.js'

const ExplorePage = () => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const handleOpenModal = (post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await getExplorePosts()
        setPosts(Array.isArray(postsData) ? postsData : postsData.posts || [])

        const userData = await getMyProfile()
        setCurrentUser(userData)
      } catch (error) {
        console.log(error)
      }
    }
    loadPosts()
  }, [])

  const handleDelete = async (post) => {
    try {
      await deletePost(post._id)

      setPosts((prev) => prev.filter((item) => item._id !== post._id))

      handleCloseModal()
    } catch (error) {
      console.error(error)
    }
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
    <>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div
            key={post._id}
            className={styles.card}
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
    </>
  )
}

export default ExplorePage
