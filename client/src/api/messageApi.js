import axios from 'axios'

const getToken = () => localStorage.getItem('token')

export const getMyConversations = async () => {
  const { data } = await axios.get(
    'http://localhost:5000/api/messages/conversations',
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}

export const createOrGetConversation = async (participantId) => {
  const { data } = await axios.post(
    'http://localhost:5000/api/messages/conversations',
    { participantId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}

export const getMessageByConversation = async (convetsationId) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/messages/conversations/${convetsationId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}

export const sendMessage = async (conversationId, text) => {
  const { data } = await axios.post(
    `http://localhost:5000/api/messages/conversations/${conversationId}/messages`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
  return data
}
