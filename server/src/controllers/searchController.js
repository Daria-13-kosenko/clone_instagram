import User from '../models/User.js'

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query

    if (!query || !query.trim()) {
      return res.json([])
    }

    const users = await User.find({
      username: { $regex: query, $options: 'i' },
    })
      .select('username fullName avatar')
      .limit(10)
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
