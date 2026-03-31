import { useEffect, useState } from 'react'
import { createComment, getCommentsByPost } from '../../src/api/commentApi'
import { getPostLikes, likePost, unlikePost } from '../../src/api/likeApi'
import styles from './PostCard.module.css'

const PostCard = ({ post }) => {
  const [likesCount, setLikesCount] = useState(0)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    loadLikes()
    loadComments()
  }, [post._id])

  const loadLikes = async () => {
    try {
      const data = await getPostLikes(post._id)
      setLikesCount(data.likesCount || 0)
      setIsLiked(data.isLiked || false)
    } catch (error) {
      console.log(error)
    }
  }

  const loadComments = async () => {
    try {
      const data = await getCommentsByPost(post._id)
      setComments(Array.isArray(data) ? data : data.comments || [])
    } catch (error) {
      console.log(error)
      setComments([])
    }
  }

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        const data = await unlikePost(post._id)
        setLikesCount(data.likesCount)
        setIsLiked(false)
      } else {
        const data = await likePost(post._id)
        setLikesCount(data.likesCount)
        setIsLiked(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    if (!commentText.trim()) return

    try {
      const data = await createComment(post._id, commentText)
      setComments((prev) => [data.comment, ...prev])
      setCommentText('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <p>
          <strong>{post.author?.username}</strong>
        </p>
      </div>

      <img src={post.image} alt={post.caption} className={styles.image} />

      <div className={styles.actions}>
        <button type="button" onClick={handleLikeToggle}>
          {isLiked ? '♥ Unlike' : '♡ Like'}
        </button>
      </div>

      <p className={styles.likes}>{likesCount} likes</p>

      <p className={styles.caption}>
        <strong>{post.author?.username}</strong> {post.caption}
      </p>

      <div className={styles.comments}>
        {comments.map((comment) => (
          <p key={comment._id}>
            <strong>{comment.author?.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </article>
  )
}

export default PostCard
