import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import mongoose from 'mongoose'

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params
    const { text } = req.body
    const userId = req.user.userId

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' })
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment text is required' })
    }

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const comment = await Comment.create({
      text,
      author: userId,
      post: postId,
    })

    const populatedComment = await Comment.findById(comment._id).populate(
      'author',
      'username avatar',
    )

    res.status(201).json({
      message: 'Comment created successfully',
      comment: populatedComment,
    })
  } catch (error) {
    console.error('createComment error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    const comments = await Comment.find({ post: postId })
      .populate('author', 'username fullName avatar')
      .sort({ createdAt: -1 })

    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
