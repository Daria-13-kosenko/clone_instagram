import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  getUserProfileById,
  getUserPostsById,
  followUser,
  unfollowUser,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/me', authMiddleware, getMyProfile)
router.put('/me', authMiddleware, updateMyProfile)

router.get('/:userId', authMiddleware, getUserProfileById)
router.get('/:userId/posts', authMiddleware, getUserPostsById)
router.post('/:userId/follow', authMiddleware, followUser)
router.delete('/:userId/follow', authMiddleware, unfollowUser)

export default router
