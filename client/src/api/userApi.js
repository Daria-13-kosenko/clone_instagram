import API from './axios'

export const getMyProfile = async () => {
  const response = await API.get('/users/me')
  return response.data
}
export const updateMyProfile = async (userData) => {
  const response = await API.put('/users/me', userData)
  return response.data
}
