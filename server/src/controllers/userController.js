import User from '../models/User.js'

export const getMyProfile = async () => {
  const token = localStorage.getItem('token')

  const { data } = await axios.get('http://localhost:5000/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
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
