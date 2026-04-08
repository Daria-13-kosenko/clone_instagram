import { useEffect, useRef, useState } from 'react'
import styles from './PostModal.module.css'

const PostModal = ({
  post,
  currentUser,
  onClose,
  onDelete,
  onEdit,
  onGoToPost,
  onCopyLink,
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const authorId = post?.author._id || post?.author
  const currentUserId = currentUser?._id || currentUser?.userId

  const isOwner =
    Boolean(currentUserId) &&
    Boolean(authorId) &&
    String(currentUserId) === String(authorId)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!post) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={styles.imageSide}>
          <img
            src={post.image}
            alt={post.caption || 'post'}
            className={styles.postImage}
          />
        </div>

        <div className={styles.contentSide}>
          <div className={styles.header}>
            <div className={styles.authorInfo}>
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt="avatar"
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>U</div>
              )}
              <span className={styles.username}>
                {post.author?.username || 'user'}
              </span>
            </div>

            {isOwner && (
              <div className={styles.menuWrapper} ref={menuRef}>
                <button
                  className={styles.dotsBtn}
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  ⋯
                </button>

                {showMenu && (
                  <div className={styles.dropdown}>
                    <button
                      className={`${styles.dropdownItem} ${styles.deleteItem}`}
                      onClick={() => {
                        setShowMenu(false)
                        onDelete(post)
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        setShowMenu(false)
                        onEdit(post)
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        setShowMenu(false)
                        onGoToPost(post)
                      }}
                    >
                      Go to post
                    </button>

                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        setShowMenu(false)
                        onCopyLink(post)
                      }}
                    >
                      Copy link
                    </button>

                    <button
                      className={styles.dropdownItem}
                      onClick={() => setShowMenu(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.captionBlock}>
            <p className={styles.caption}>
              <span className={styles.captionUser}>
                {post.author?.username || 'user'}
              </span>{' '}
              {post.caption}
            </p>
          </div>

          <div className={styles.commentsBlock}>
            {post.comments?.length ? (
              post.comments.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                  <span className={styles.commentUser}>
                    {comment.user?.username || 'user'}
                  </span>
                  <span>{comment.text}</span>
                </div>
              ))
            ) : (
              <p className={styles.noComments}>No comments yet</p>
            )}
          </div>

          <div className={styles.footer}>
            <p className={styles.likesCount}>{post.likes?.length || 0} likes</p>

            <div className={styles.addComment}>
              <input type="text" placeholder="Add comment" />
              <button type="button">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostModal
