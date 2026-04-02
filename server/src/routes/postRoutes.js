import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'
import {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getExplorePosts,
  getMyPosts,
} from '../controllers/postController.js'

const router = express.Router()

router.get('/explore', authMiddleware, getExplorePosts)
router.get('/', getAllPost)
router.get('/me', authMiddleware, getMyPosts)
router.get('/:id', getPostById)
router.post('/', authMiddleware, upload.single('image'), createPost)
router.put('/:id', authMiddleware, upload.single('image'), updatePost)
router.delete('/:id', authMiddleware, deletePost)

export default router
