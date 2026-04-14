import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

const onlineUsers = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join', (userId) => {
    onlineUsers.set(userId, socket.id)
  })
  socket.on('join', (userId) => {
    socket.join(userId)
  })
  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId)
  })

  socket.on('sendMessage', (message) => {
    io.to(message.conversation).emit('newMessage', message)
    if (message.recipientId) {
      io.to(message.recipientId).emit('newNotification')
    }
  })

  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId)
        break
      }
    }
    console.log('User disconnected:', socket.id)
  })
})

app.use(cors())
// app.use(express.json())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

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

export { app, server, io }
