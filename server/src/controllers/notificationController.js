import Notification from '../models/Notification.js'

export const getMyNotification = async (req, res) => {
  try {
    const userId = req.user.id

    const notification = await Notification.find({ recipient: userId })
      .populate('sender', 'username avatar')
      .populate('post', 'image')
      .populate('comment', 'text')
      .sort({ createdAt: -1 })

    res.json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
