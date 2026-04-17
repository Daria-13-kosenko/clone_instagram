import axios from 'axios'

export const getExplorePosts = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/posts/explore`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}
