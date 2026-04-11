import axios from 'axios'

export const getAllPosts = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.post(
    'http://localhost:5000/api/posts',
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

export const createPost = async (formData) => {
  const token = localStorage.getItem('token')

  const { data } = await axios.post(
    'http://localhost:5000/api/posts',
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
  const response = await API.put(`/put/${postId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const deletePost = async (postId) => {
  const response = await API.delete(`/posts/${postId}`)
  return response.data
}

export const getMyPosts = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get('http://localhost:5000/api/posts/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
