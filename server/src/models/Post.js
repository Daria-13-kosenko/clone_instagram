import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

const Post = mongoose.model('Post', postSchema)

export default Post
