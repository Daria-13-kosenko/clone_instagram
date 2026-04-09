import axios from 'axios'

export const getCommentsByPost = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `http://localhost:5000/api/comments/${postId}`,
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
    `http://localhost:5000/api/comments/${postId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}
