import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {
  createComment,
  getCommentByPost,
} from '../controllers/commentController.js'

const router = express.Router()

router.get('/:postId', authMiddleware, getCommentByPost)
router.post('/:postId', authMiddleware, createComment)

export default router
