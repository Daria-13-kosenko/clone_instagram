import Post from '../models/Post.js'

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body

    if (!req.file) {
      return res.status(400).json({
        message: 'Post image is required',
      })
    }

    const mimeType = req.file.mimeType
    const base64Image = `data:${mimeType};base64,${req.file.buffer.toString('base64')}`

    const post = await Post.create({
      caption: caption || '',
      image: base64Image,
      author: req.user.userId,
    })

    const populatePost = await Post.findById(post._id).populate(
      'author',
      'username fullName avatar',
    )

    res.status(201).json({
      message: 'Post created successfully',
      post: populatePost,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username fullName avatar')
      .sort({ createdAt: -1 })

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username fullName avatar',
    )

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { caption } = req.body

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You can update only your own posts ',
      })
    }

    post.caption = caption ?? post.caption

    if (req.file) {
      const mimeType = req.file.mimetype
      const base64Image = `data:${mimeType};base64,${req.file.buffer.toString('base64')}`
      post.image = base64Image
    }

    await post.save()

    const updatedPost = await Post.findById(post._id).populate(
      'author',
      'username fullName avatar',
    )
    res.status(200).json({
      message: 'Post updated successfully',
      post: updatePost,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: 'You can delete only your own posts',
      })
    }
    await post.deleteOne()

    res.status(200).json({
      message: 'Post deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
