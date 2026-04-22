import axios from 'axios'

export const getAllPosts = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/posts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}

export const createPost = async (formData) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/posts`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return data
}

export const updatePost = async (postId, formData) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return data
}
export const deletePost = async (postId) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}

export const getMyPosts = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/posts/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return data
}
