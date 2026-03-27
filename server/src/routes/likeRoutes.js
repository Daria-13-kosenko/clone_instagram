import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {
  getPostLikes,
  likePost,
  unlikePost,
} from '../controllers/likeController.js'

const router = express.Router()

router.get('/:postId', getPostLikes)
router.post('/:postId', authMiddleware, likePost)
router.delete('/:postId', authMiddleware, unlikePost)

export default router
