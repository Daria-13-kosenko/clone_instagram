import mongoose from 'mongoose'
import Conversation from '../models/Conversation.js'
import Message from '../models/Message.js'

export const getMyConversation = async (req, res) => {
  try {
    const userId = req.user.userId

    const conversation = await Conversation.find({
      participants: userId,
    })
      .populate('participants', 'username avatar')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'sender',
          select: 'username avatar',
        },
      })
      .sort({ updatedAt: -1 })

    res.json(conversation)
  } catch (error) {
    console.error('getMyConversation error:', error)
    res.status(500).json({ message: error.message })
  }
}
