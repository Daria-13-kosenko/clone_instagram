import { getExplorePosts } from '../../src/api/exploreApi'
import { useState, useEffect } from 'react'
import styles from './ExplorePage.module.css'

const ExplorePage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getExplorePosts()
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
    }
    loadPosts()
  }, [])

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <div key={post._id} className={styles.card}>
          <img src={post.image} alt="post" />
        </div>
      ))}
    </div>
  )
}

export default ExplorePage
