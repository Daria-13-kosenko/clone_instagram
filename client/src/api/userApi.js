import axios from 'axios'

export const getMyProfile = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    '${import.meta.env.VITE_API_URL}/api/users/me',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}
export const updateMyProfile = async (profileData) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.patch(
    '${import.meta.env.VITE_API_URL}/api/users/me',
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
