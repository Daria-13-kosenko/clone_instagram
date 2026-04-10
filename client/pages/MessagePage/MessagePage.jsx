import { useEffect, useState, useMemo } from 'react'
import { io } from 'socket.io-client'
import AppLayout from '../../components/AppLayout/AppLayout.jsx'
import {
  getMyConversation,
  getMessageByConversation,
  sendMessage,
} from '../../src/api/messageApi.js'
import { getProfile } from '../../src/api/userApi.js'
import styles from './MessagePage.module.css'

const socket = io('http://localhost:5000')

const MessagePage = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [conversations, setConversations] = useState([])

  return <div></div>
}

export default MessagePage
