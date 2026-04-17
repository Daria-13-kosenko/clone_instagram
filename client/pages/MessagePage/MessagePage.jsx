import { useEffect, useState, useMemo } from 'react'
import { io } from 'socket.io-client'
import AppLayout from '../../components/AppLayout/AppLayout.jsx'
import {
  getMyConversations,
  getMessageByConversation,
  sendMessage,
} from '../../src/api/messageApi.js'
import { getMyProfile } from '../../src/api/userApi.js'
import styles from './MessagePage.module.css'

const socket = io(import.meta.env.VITE_API_URL)

const MessagePage = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const me = await getMyProfile()
        setCurrentUser(me)

        const convs = await getMyConversations()
        setConversations(convs)

        if (convs.lenght > 0) {
          setSelectedConversation(convs[0])
        }
        socket.emit('join', me._id || me.userId)
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (!currentUser?._id) return
    socket.emit('join', currentUser._id)
  }, [currentUser])

  useEffect(() => {
    if (!selectedConversation?._id) return

    const loadMessages = async () => {
      try {
        const data = await getMessageByConversation(selectedConversation._id)
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    loadMessages()
  }, [selectedConversation])

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (message.conversation === selectedConversation?._id) {
        setMessages((prev) => [...prev, message])
      }
    }
    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [selectedConversation])

  const selectedUser = useMemo(() => {
    if (!selectedConversation || !currentUser) return null

    return selectedConversation.participants.find(
      (user) => String(user._id) !== String(currentUser._id),
    )
  }, [selectedConversation, currentUser])

  const handleSend = async (e) => {
    e.preventDefault()

    if (!text.trim() || !selectedConversation?._id) return

    try {
      const newMessage = await sendMessage(selectedConversation._id, text)

      setMessages((prev) => [...prev, newMessage])
      setText('')

      socket.emit('sendMessage', {
        ...newMessage,
        conversation: selectedConversation._id,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AppLayout className={styles.messagePage}>
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <h2 className={styles.myName}>
            {currentUser?.username || 'Message'}
          </h2>

          <div className={styles.conversations}>
            {conversations.map((conversation) => {
              const otherUser = conversation.participants.find(
                (user) => String(user._id) !== String(currentUser?._id),
              )
              return (
                <button
                  key={conversation._id}
                  className={styles.conversationItem}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className={styles.avatarCircle}>
                    {otherUser?.avatar ? (
                      <img
                        src={otherUser.avatar}
                        alt={otherUser.username}
                        className={styles.avatar}
                      />
                    ) : (
                      otherUser?.username?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>

                  <div className={styles.conversationText}>
                    <p className={styles.username}>{otherUser?.username}</p>
                    <p className={styles.preview}>
                      {conversation.lastMessage?.text || 'Start chatting'}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.chatArea}>
          {selectedConversation && selectedUser ? (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.chatUser}>
                  <div className={styles.avatarCircle}>
                    {selectedUser?.avatar ? (
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.username}
                        className={styles.avatar}
                      />
                    ) : (
                      selectedUser?.username?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>
                  <span>{selectedUser.username}</span>
                </div>
              </div>

              <div className={styles.messagesList}>
                {messages.map((message) => {
                  const isMine =
                    String(message.sender?._id || message.sender) ===
                    String(currentUser?._id)

                  return (
                    <div
                      key={message._id}
                      className={
                        isMine ? styles.myMessageRow : styles.otherMessageRow
                      }
                    >
                      <div
                        className={
                          styles.isMine ? styles.myMessage : styles.otherMessage
                        }
                      >
                        {message.text}
                      </div>
                    </div>
                  )
                })}
              </div>

              <form className={styles.messageForm} onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Write message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={styles.input}
                />
              </form>
            </>
          ) : (
            <div className={styles.emptyState}>Select a conversation</div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default MessagePage
