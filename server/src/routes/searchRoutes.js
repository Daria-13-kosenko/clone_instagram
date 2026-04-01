import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { searchUsers } from '../controllers/searchController.js'

const router = express.Router()

router.get('/users', authMiddleware, searchUsers)

export default router
