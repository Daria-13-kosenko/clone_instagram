import User from '../models/User.js'

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const updateMyProfile = async (req, res) => {
  try {
    const { username, fullName, bio } = req.body

    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username })

      if (existingUsername) {
        return res.status(400).json({
          message: 'Username already taken',
        })
      }
      user.username = username
    }

    if (fullName !== undefined) {
      user.fullName = fullName
    }

    if (bio !== undefined) {
      user.bio = bio
    }
    await user.save()

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
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
