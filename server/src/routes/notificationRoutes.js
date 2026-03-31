import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getMyNotification } from '../controllers/notificationController.js'

const router = express.Router()

router.get('/', authMiddleware, getMyNotification)

export default router
