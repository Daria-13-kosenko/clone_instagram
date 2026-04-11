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

export const getMessageByConvercation = async (req, res) => {
  try {
    const { conversationId } = req.params

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: 'Invalid conversation id' })
    }

    const message = await Message.find({ conversation: conversationId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: 1 })

    res.json(message)
  } catch (error) {
    console.error('getMessageByConvercation error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const createOrGetConversation = async (req, res) => {
  try {
    const userId = req.user.userId
    const { participantId } = req.body

    if (!participantId) {
      return res.status(400).json({ message: 'participantId is required' })
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId], $size: 2 },
    })
      .populate('participants', 'username avatar')
      .populate('lastMessage')

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, participantId],
      })

      conversation = await Conversation.findById(conversation._id)
        .populate('participants', 'username avatar')
        .populate('lastMessage')
    }

    res.status(200).json(conversation)
  } catch (error) {
    console.error('createOrGetConversation error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.userId
    const { conversationId } = req.params
    const { text } = req.body

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: 'Invalid conversation id' })
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Text is required' })
    }

    const conversation = await Conversation.findById(conversationId)
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: userId,
      text,
    })

    conversation.lastMessage = message._id
    await conversation.save()

    const populatedMessage = await Message.findById(message._id).populate(
      'sender',
      'username avatar',
    )

    res.status(201).json(populatedMessage)
  } catch (error) {
    console.error('sendMessage error:', error)
    res.status(500).json({ message: error.message })
  }
}
