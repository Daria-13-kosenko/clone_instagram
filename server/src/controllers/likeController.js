import Like from '../models/Like.js'
import Post from '../models/Post.js'
import Notification from '../models/Notification.js'

export const likePost = async (req, res) => {
  try {
    const userId = req.user.id
    const { postId } = req.params

    const existingLike = await Like.findOne({
      user: userId,
      post: postId,
    })

    if (existingLike) {
      return res.status(400).json({
        message: 'You already liked this post',
      })
    }
    await Like.create({
      user: userId,
      post: postId,
    })

    const post = await Post.findById(postId)

    if (post.author.toString() !== userId) {
      await Notification.create({
        recipient: post.author,
        sender: userId,
        type: 'like',
        post: postId,
      })
    }

    const likesCount = await Like.countDocuments({ post: postId })

    res.status(201).json({
      message: 'Post liked successfully',
      likesCount,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params

    const like = await Like.findOne({
      user: req.user.userId,
      post: postId,
    })

    if (!like) {
      return res.status(404).json({
        message: 'Like not found',
      })
    }
    await like.deleteOne()

    const likesCount = await Like.countDocuments({ post: postId })

    res.status(200).json({
      message: 'Like removed successfully',
      likesCount,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    const likes = await Like.find({ post: postId }).populate(
      'user',
      'username fullName avatar',
    )

    res.status(200).json({
      likesCount: likes.length,
      likes,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
