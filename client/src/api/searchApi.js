import axios from 'axios'

export const searchUsers = async (query) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `http://localhost:5000/api/search/users?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
