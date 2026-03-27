import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
  try {
    const { text } = req.body
    const { postId } = req.params

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: 'Comment text is required',
      })
    }

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    const comment = await Comment.create({
      text: text.trim(),
      author: req.user.userId,
      post: postId,
    })

    const populatedComment = await Comment.findById(comment._id).populate(
      'author',
      'username fullName avatar',
    )

    res.status(201).json({
      message: 'Comment added successfully',
      comment: populatedComment,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
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
