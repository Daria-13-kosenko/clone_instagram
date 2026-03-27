import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const registerUser = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body

    if (!username || !fullName || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    const existingUserByEmail = await User.findOne({ email })
    if (existingUserByEmail) {
      return res.status(400).json({
        message: 'User with this email already exists',
      })
    }

    const existingUserByUsername = await User.findOne({ username })
    if (existingUserByUsername) {
      return res.status(400).json({
        message: 'Username already taken',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
    })

    const token = generateToken(user._id)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      message: 'Login successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
