import Notification from '../models/Notification'
import Follow from '../models/Follow.js'

export const follow = async (req, res) => {
  try {
    const followerId = req.user.id
    const { userId } = req.params

    if (followerId === userId) {
      return res.status(400).json({ message: 'You cannot follow yourself' })
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId,
    })

    if (existingFollow) {
      return res.status(400).json({ message: 'Already following' })
    }

    await Follow.create({
      follower: followerId,
      following: userId,
    })

    await Notification.create({
      recipient: userId,
      sender: followerId,
      type: 'follow',
    })

    res.status(201).json({ message: 'Followed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
