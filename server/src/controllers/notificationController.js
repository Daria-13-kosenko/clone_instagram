import Notification from '../models/Notification.js'

export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.userId

    const notification = await Notification.find({ recipient: userId })
      .populate('sender', 'username avatar')
      .populate('post', 'image')
      .populate('comment', 'text')
      .populate('conversation')
      .sort({ createdAt: -1 })

    res.json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const markNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.userId

    await Notification.updateMany(
      { recipient: userId, isRead: false },
      { isRead: true },
    )
    res.json({ message: 'Notification marked as read' })
  } catch (error) {
    console.error('markNotificationsAsRead error:', error)
    res.status(500).json({ message: error.message })
  }
}
