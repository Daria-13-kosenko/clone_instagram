import API from './axios'

export const getAllPosts = async () => {
  const response = await API.get('/posts')
  return response.data
}

export const createPost = async (formData) => {
  const response = await API.post('/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
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
