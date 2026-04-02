import { useEffect, useState } from 'react'
import styles from './EditProfile.css'
import { getMyProfile, updateMyProfile } from '../../src/api/userApi'

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    website: '',
    bio: '',
    avatar: '',
  })

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

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      await updateMyProfile(formData)
      alert('Profile update successfully')
    } catch (error) {
      console.log(error)
      alert('Failed to update profile')
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Edit profile</h1>

      <form className={styles.form} onSubmit={handleSave}></form>
      <div className={styles.profileBox}>
        <div className={styles.profileInfo}>
          <img
            src={formData.avatar || 'https://via.placeholder.com/56'}
            alt="avatar"
            className={styles.avatar}
          />

          <div>
            <p className={styles.username}>{formData.username}</p>
            <p className={styles.bioPreview}>{formData.bio}</p>
          </div>
        </div>

        <button type="button" className={styles.photoButton}>
          New photo
        </button>
      </div>

      <div className={styles.field}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label>Website</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label>About</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          maxLength={150}
        ></textarea>
        <p className={styles.counter}>{formData.bio.length} /150</p>
      </div>

      <button type="submit" className={styles.saveButton}>
        Save
      </button>
    </div>
  )
}

export default EditProfile
