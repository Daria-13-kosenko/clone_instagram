import axios from 'axios'

export const getExplorePosts = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get('http://localhost:5000/api/posts/explore', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
