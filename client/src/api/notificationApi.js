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

export const markNotificationsAsRead = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.patch(
    'http://localhost:5000/api/notifications/read',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
