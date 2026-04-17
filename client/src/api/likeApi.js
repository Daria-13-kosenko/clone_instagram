import axios from 'axios'

export const getPostLikes = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/likes/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}

export const likePost = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/likes/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}

export const unlikePost = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/likes/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
