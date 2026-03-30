import API from './axios'

export const getPostLikes = async (postId) => {
  const response = await API.get(`/likes/${postId}`)
  return response.data
}

export const likePost = async (postId) => {
  const response = await API.post(`/like/${postId}`)
  return response.data
}

export const unlikePost = async (postId) => {
  const response = await API.delete(`/like/${postId}`)
  return response.data
}
