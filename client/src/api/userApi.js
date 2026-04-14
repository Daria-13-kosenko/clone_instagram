import API from './axios'
import axios from 'axios'

export const getMyProfile = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get('http://localhost:5000/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
export const updateMyProfile = async (profileData) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.patch(
    'http://localhost:5000/api/users/me',
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
