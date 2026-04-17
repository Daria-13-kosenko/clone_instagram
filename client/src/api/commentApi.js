import axios from 'axios'

export const getCommentsByPost = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/comments/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}

export const createComment = async (postId, text) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/comments/${postId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
