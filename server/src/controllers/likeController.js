import Like from '../models/Like.js'
import mongoose from 'mongoose'

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' })
    }

    const likes = await Like.find({ post: postId }).populate(
      'user',
      'username avatar',
    )

    res.json(likes)
  } catch (error) {
    console.error('getPostLikes error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params
    const userId = req.user.userId

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' })
    }

    const existingLike = await Like.findOne({ user: userId, post: postId })

    if (existingLike) {
      return res.status(400).json({ message: 'Post already liked' })
    }

    const like = await Like.create({
      user: userId,
      post: postId,
    })

    res.status(201).json(like)
  } catch (error) {
    console.error('likePost error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params
    const userId = req.user.userId

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' })
    }

    const like = await Like.findOneAndDelete({
      user: userId,
      post: postId,
    })

    if (!like) {
      return res.status(404).json({ message: 'Like not found' })
    }

    res.json({ message: 'Like removed successfully' })
  } catch (error) {
    console.error('unlikePost error:', error)
    res.status(500).json({ message: error.message })
  }
}
