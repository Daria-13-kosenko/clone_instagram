import API from './axios'

export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData)
  return response.data
}

export const liginUser = async (userData) => {
  const response = await API.post('/auth/login', userData)
  return response.data
}
