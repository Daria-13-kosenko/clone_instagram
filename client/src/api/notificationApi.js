import axios from 'axios'

export const getMyNotifications = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/notifications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}

export const markNotificationsAsRead = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/notifications/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
