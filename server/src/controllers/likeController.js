import Like from '../models/Like.js'
import mongoose from 'mongoose'
import Post from '../models/Post.js'
import Notification from '../models/Notification.js'

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params
    const userId = req.user.userId

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' })
    }

    const likes = await Like.find({ post: postId })
    const isLiked = likes.some((like) => String(like.user) === String(userId))

    res.json({
      likesCount: likes.length,
      isLiked,
    })
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

    await Like.findOneAndDelete({
      user: userId,
      post: postId,
    })

    const likesCount = await Like.countDocuments({ post: postId })

    res.json({
      message: 'Like removed successfully',
      likesCount,
      isLiked: false,
    })
  } catch (error) {
    console.error('unlikePost error:', error)
    res.status(500).json({ message: error.message })
  }
}
