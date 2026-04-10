import dotenv from 'dotenv'
import { server } from './app.js'
import { connectDB } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()

  server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
  })
}

startServer()
