import Notification from '../models/Notification.js'
import Follow from '../models/Follow.js'
import User from '../models/User.js'

export const follow = async (req, res) => {
  try {
    console.log('req.user:', req.user)
    console.log('req.params:', req.params)

    const followerId = req.user?.id
    const { userId } = req.params

    if (!followerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!userId) {
      return res.status(400).json({ message: 'User id is required' })
    }

    if (followerId === userId) {
      return res.status(400).json({ message: 'You cannot follow yourself' })
    }

    const targetUser = await User.findById(userId)

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId,
    })

    if (existingFollow) {
      return res.status(400).json({ message: 'Already following' })
    }

    const newFollow = await Follow.create({
      follower: followerId,
      following: userId,
    })

    console.log('follow created:', newFollow)

    const notification = await Notification.create({
      recipient: userId,
      sender: followerId,
      type: 'follow',
    })

    console.log('notification created:', notification)

    res.status(201).json({ message: 'Followed successfully' })
  } catch (error) {
    console.error('FOLLOW ERROR FULL:', error)
    res.status(500).json({ message: error.message })
  }
}
