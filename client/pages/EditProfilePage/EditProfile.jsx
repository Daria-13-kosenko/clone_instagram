import { useEffect, useRef, useState } from 'react'
import styles from './EditProfile.module.css'
import { getMyProfile, updateMyProfile } from '../../src/api/userApi'

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    website: '',
    bio: '',
    avatar: '',
  })
  const fileInputRef = useRef(null)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile()
        setFormData({
          username: data.username || '',
          website: data.website || '',
          bio: data.bio || '',
          avatar: data.avatar || '',
        })
      } catch (error) {
        console.log(error)
      }
    }
    loadProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxSize = 300

        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)

        setFormData((prev) => ({
          ...prev,
          avatar: compressedBase64,
        }))
      }
      img.src = reader.result
    }

    reader.readAsDataURL(file)
  }

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      await updateMyProfile(formData)
      alert('Profile updated successfully')
    } catch (error) {
      console.log(error)
      alert('Failed to update profile')
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Edit profile</h1>

      <form className={styles.form} onSubmit={handleSave}>
        <div className={styles.profileBox}>
          <div className={styles.profileInfo}>
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="avatar"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {formData.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}

            <div>
              <p className={styles.username}>{formData.username}</p>
              <p className={styles.bioPreview}>{formData.bio}</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.photoButton}
            onClick={handleOpenFilePicker}
          >
            New photo
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="bio">About</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength={150}
          />
          <p className={styles.counter}>{formData.bio.length} / 150</p>
        </div>

        <button type="submit" className={styles.saveButton}>
          Save
        </button>
      </form>
    </div>
  )
}
export default EditProfile
