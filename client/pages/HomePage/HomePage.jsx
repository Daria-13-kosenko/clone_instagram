import styles from './HomePage.module.css'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../src/api/postApi.js'
import PostCard from '../../components/PostCard/PostCard.jsx'
import AppLayout from '../../components/AppLayout/AppLayout.jsx'
import AllTheUpdate from '../../src/assets/icons/allTheUpd.svg'

const HomePage = () => {
  const [posts, setPosts] = useState([])

  const loadPosts = async () => {
    try {
      const data = await getAllPosts()
      setPosts(Array.isArray(data) ? data : data.posts || [])
    } catch (error) {
      console.log(error)
      setPosts([])
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev])
  }

  return (
    <AppLayout onPostCreated={handlePostCreated}>
      <div className={styles.page}>
        {' '}
        <div className={styles.feed}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className={styles.bottomInfo}>
        <div className={styles.circle}>
          <img src={AllTheUpdate} />
        </div>
        <p className={styles.title}>You've seen all the updates</p>
        <p className={styles.text}>You have viewed all new publications</p>
      </div>
    </AppLayout>
  )
}

export default HomePage
