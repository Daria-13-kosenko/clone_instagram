import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { Server } from 'socket.io'

const io = new Server(Server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})

const onlineUsers = new Map()

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId)
  })

  socket.on('sendMessage', (message) => {
    io.to(message.conversation).emit('newMessage', message)
  })

  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId)
        break
      }
    }
  })
})

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API is working' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/messages', messageRoutes)

export default app
