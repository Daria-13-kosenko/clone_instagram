import {
  getUserProfileById,
  getUserPostsById,
  followUser,
  unfollowUser,
} from '../controllers/userPageControllers.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import express from 'express'

const router = express.Router()

router.get('/:userId', authMiddleware, getUserPostsById)
router.get('/:userId/posts', authMiddleware, getUserProfileById)
router.post('/:userId/follow', authMiddleware, followUser)
router.delete('/:userId/follow', authMiddleware, unfollowUser)
