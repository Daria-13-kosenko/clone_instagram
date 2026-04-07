import { useState } from 'react'
import PostCard from '../PostCard/PostCard'
import PostModal from '../PostModal/PostModal'
import styles from './PostGrid.module.css'

const PostGrid = ({ posts, currentUser }) => {
  const [selectedPost, setSelectedPost] = useState(null)

  const handleOpenModal = (post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const handleDelete = (post) => {
    console.log('delete', post)
  }

  const handleEdit = (post) => {
    console.log('edit', post)
  }

  const handleGoToPost = (post) => {
    console.log('go to post', post)
  }

  const handleCopyLink = async (post) => {
    const link = `${window.location.origin}/posts/${post._id}`
    await navigator.clipboard.writeText(link)
    alert('Link copied')
  }

  return (
    <>
      <div className={styles.grid}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onOpenModal={handleOpenModal} />
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

export default PostGrid
