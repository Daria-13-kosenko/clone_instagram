import axios from 'axios'

const getToken = () => localStorage.getItem('token')

export const getUserProfile = async (userId) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}

export const getUserPosts = async (userId) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/users/${userId}/posts`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}

export const followUser = async (userId) => {
  const { data } = await axios.post(
    `http://localhost:5000/api/users/${userId}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}

export const unfollowUser = async (userId) => {
  const { data } = await axios.delete(
    `http://localhost:5000/api/users/${userId}/follow`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}
