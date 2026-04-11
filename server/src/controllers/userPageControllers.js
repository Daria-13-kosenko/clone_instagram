import User from '../models/User.js'
import Post from '../models/Post.js'
import Notifications from '../../../client/components/Notification/Notification.jsx'
import mongoose from 'mongoose'

export const getUserProfileById = async (req, res) => {
  try {
    const { userId } = req.params
    const currentUserId = req.user.userId

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user id' })
    }

    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isFollowing = user.followers?.some(
      (id) => String(id) === String(currentUserId),
    )

    res.json({
      ...user.toObject(),
      followersCount: user.followers?.lenghth || 0,
      followingCount: user.following?.lenghth || 0,
      isFollowing,
    })
  } catch (error) {
    console.error('getUserProfileById error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const getUserPostsById = async (req, res) => {
  try {
    const { userId } = req.params

    const posts = await Post.find({ author: userId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })

    res.json(posts)
  } catch (error) {
    console.error('getUserPostsById error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.userId
    const { userId } = req.params

    if (String(currentUserId) === String(userId)) {
      return res.status(400).json({ message: 'You cannot follow yourself' })
    }

    const currentUser = await User.findById(currentUserId)
    const targetUser = await User.findById(userId)

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const alreadyFollowing = currentUser.following?.some(
      (id) => String(id) === String(userId),
    )

    if (!alreadyFollowing) {
      currentUser.following.push(userId)
      targetUser.followers.push(currentUserId)

      await currentUser.save()
      await targetUser.save()

      await Notifications.create({
        recipient: userId,
        sender: currentUserId,
        type: 'follow',
      })
    }
    res.json({ message: 'Followed successfully' })
  } catch (error) {
    console.error('followUser error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user.userId
    const { userId } = req.params

    const currentUser = await User.findById(currentUserId)
    const targetUser = await User.findById(userId)

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    currentUser.following = currentUser.following.filter(
      (id) => String(id) !== String(userId),
    )

    targetUser.followers = targetUser.followers.filter(
      (id) => String(id) !== String(currentUserId),
    )

    await currentUser.save()
    await targetUser.save()

    res.json({ message: 'Unfollowed successfully' })
  } catch (error) {
    console.error('unfollowUser error:', error)
    res.status(500).json({ message: error.message })
  }
}
