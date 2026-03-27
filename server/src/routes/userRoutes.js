import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'
import {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/me', authMiddleware, getMyProfile)
router.put('/me', authMiddleware, updateMyProfile)
router.post('/avatar', authMiddleware, upload.single('avatar'), uploadAvatar)

export default router
