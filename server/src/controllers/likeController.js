import Like from '../models/Like.js'
import mongoose from 'mongoose'
import Post from '../models/Post.js'
import Notification from '../models/Notification.js'

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
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const existingLike = await Like.findOne({ user: userId, post: postId })

    if (existingLike) {
      const likesCount = await Like.countDocuments({ post: postId })
      return res.status(200).json({
        message: 'Post already liked',
        likesCount,
        isLiked: true,
      })
    }
    await Like.create({
      user: userId,
      post: postId,
    })
    if (String(post.author) !== String(userId)) {
      await Notification.create({
        recipient: post.author,
        sender: userId,
        type: 'like',
        post: postId,
      })
    }
    const likesCount = await Like.countDocuments({ post: postId })

    res.status(201).json({
      likesCount,
      isLiked: true,
    })
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
