import API from './axios'

export const getCommentsByPost = async (postId) => {
  const response = await API.get(`/comments/${postId}`)
  return response.data
}

export const createComment = async (postId, text) => {
  const response = await API.post(`/comment/${postId}`, { text })
  return response.data
}
