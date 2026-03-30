import styles from './HomePage.module.css'

const posts = [
  {
    id: 1,
    author: 'sashko',
    time: '2 week',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    likes: '101 824',
    caption: 'Saturn ✨ #galina_ #people?',
  },
  {
    id: 2,
    author: 'sashko',
    time: '2 week',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    likes: '101 824',
    caption: 'Saturn ✨ #galina_ #people?',
  },
  {
    id: 3,
    author: 'sashko',
    time: '2 week',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    likes: '101 824',
    caption: 'Saturn ✨ #galina_ #people?',
  },
  {
    id: 4,
    author: 'sashko',
    time: '2 week',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    likes: '101 824',
    caption: 'Saturn ✨ #galina_ #people?',
  },
]

const HomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}></div>
              <p>
                <strong>{post.author}</strong> · {post.time} · {''}
                <span className={styles.follow}>follow</span>
              </p>
            </div>
            <img src={post.image} alt={post.caption} className={styles.image} />

            <div className={styles.actions}>♡ ○</div>

            <p className={styles.likes}>{post.likes}likes</p>
            <p className={styles.caption}>
              <strong>{post.author}</strong>
              {post.caption}
            </p>
            <p className={styles.comments}>View all comments (23)</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default HomePage
