import axios from 'axios'

export const getMyNotifications = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get('http://localhost:5000/api/notifications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
