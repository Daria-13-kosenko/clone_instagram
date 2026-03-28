import { useAuth } from '../context/AuthContext'

const ProfilePage = () => {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!user) return <p>You are not authorized</p>

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Fullname: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
      {user.avatar && <img src={user.avatar} alt="avatar" width="150" />}
    </div>
  )
}

export default ProfilePage
