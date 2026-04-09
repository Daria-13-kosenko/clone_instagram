import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {
  getMyConversation,
  getMessageByConvercation,
  createOrGetConversation,
  sendMessage,
} from '../controllers/messageController.js'

const router = express.Router()

router.get('/conversations', authMiddleware, getMyConversation)
router.post('/conversations', authMiddleware, createOrGetConversation)
router.get(
  '/conversations/:convercationId/messages',
  authMiddleware,
  getMessageByConvercation,
)
router.post(
  '/conversations/conversationId/messages',
  authMiddleware,
  sendMessage,
)

export default router
