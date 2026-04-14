import { useState, useRef, useEffect } from 'react'
import { createPost } from '../../src/api/postApi.js'
import Download from '../../src/assets/icons/Download.svg'
import Smile from '../../src/assets/icons/Smile.svg'
import styles from './CreatePostForm.module.css'

const CreatePostForm = ({ onPostCreated, isOpen, onClose }) => {
  const fileInputRef = useRef(null)
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleShare = async () => {
    if (!image) {
      setError('Please choose an image')
      return
    }

    try {
      setError('')

      const formData = new FormData()
      formData.append('image', image)
      formData.append('caption', caption)

      const data = await createPost(formData)

      onPostCreated?.(data.post)

      setImage(null)
      setPreview('')
      setCaption('')
      setError('')
      onClose()
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post')
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div></div>
          <h2>Create new post</h2>
          <button className={styles.shareBtn} onClick={handleShare}>
            Share
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            {!preview ? (
              <div className={styles.emptyBox}>
                <div className={styles.uploadIcon} onClick={handleChooseFile}>
                  <img src={Download} alt="Upload" />
                </div>
              </div>
            ) : (
              <img
                src={preview}
                alt="preview"
                className={styles.previewImage}
              />
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.right}>
            <div className={styles.userRow}>
              <div className={styles.userInfo}>
                <img
                  src={user?.avatar || '/default-avatar.png'}
                  alt={user?.username || 'user'}
                  className={styles.userAva}
                />
                <p>{user?.username || 'user'}</p>
              </div>
            </div>

            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={2200}
            />

            <div className={styles.bottomRow}>
              <img src={Smile} alt="Smile" />
              <p className={styles.counter}>{caption.length} / 2200</p>
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePostForm
