import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {
  getMyNotifications,
  markNotificationsAsRead,
} from '../controllers/notificationController.js'

const router = express.Router()

router.get('/', authMiddleware, getMyNotifications)
router.patch('/read', authMiddleware, markNotificationsAsRead)

export default router
