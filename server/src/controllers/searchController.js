import User from '../models/User.js'

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: 'Search query is required',
      })
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { fullName: { $regex: query, $options: 'i' } },
      ],
    }).select('-password')

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
