export const likePost = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.post(
    `http://localhost:5000/api/likes/${postId}`,
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
    `http://localhost:5000/api/likes/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}

export const getPostLikes = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `http://localhost:5000/api/likes/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}
