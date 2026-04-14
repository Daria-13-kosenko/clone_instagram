import User from '../models/User.js'
import Post from '../models/Post.js'
import mongoose from 'mongoose'

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('getMyProfile error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.username = req.body.username ?? user.username
    user.website = req.body.website ?? user.website
    user.bio = req.body.bio ?? user.bio
    user.avatar = req.body.avatar ?? user.avatar

    await user.save()

    res.json(user)
  } catch (error) {
    console.error('updateMyProfile error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Avatar file is required',
      })
    }

    const mimeType = req.file.mimetype

    const base64Image = `data:${mimeType};base64,${req.file.buffer.toString('base64')}`

    user.avatar = base64Image
    await user.save()

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatar: user.avatar,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getUserProfileById = async (req, res) => {
  try {
    const { userId } = req.params
    const currentUserId = req.user.userId

    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isFollowing = user.followers?.some(
      (id) => String(id) === String(currentUserId),
    )

    res.json({
      ...user.toObject(),
      followersCount: user.followers?.length || 0,
      followingCount: user.following?.length || 0,
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
