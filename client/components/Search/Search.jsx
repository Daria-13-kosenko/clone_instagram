import { useEffect, useState } from 'react'
import { searchUsers } from '../../src/api/searchApi.js'
import styles from './Search.module.css'
import { useNavigate } from 'react-router-dom'

const Search = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [recent, setRecent] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedRecent = JSON.parse(localStorage.getItem('recentSearches')) || []
    setRecent(savedRecent)
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await searchUsers(query)
        setResults(data)
      } catch (error) {
        console.log(error)
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [query])

  if (!isOpen) return null

  const handleAddRecent = (user) => {
    const updated = [
      user,
      ...recent.filter((item) => item._id !== user._id),
    ].slice(0, 5)

    setRecent(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  const handleOpenUserProfile = (user) => {
    if (!user?._id) return
    handleAddRecent(user)
    onClose?.()
    navigate(`/profile/${user._id}`)
  }
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.panel}>
        <h2 className={styles.title}>Search</h2>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
        </div>

        {!query.trim() ? (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>Recent</span>
            </div>

            <div className={styles.list}>
              {recent.length === 0 ? (
                <p className={styles.empty}>No recent searches.</p>
              ) : (
                recent.map((user) => (
                  <div
                    key={user._id}
                    className={styles.item}
                    onClick={() => handleOpenUserProfile(user)}
                  >
                    <img
                      src={user.avatar || '/default-avatar.png'}
                      alt={user.username}
                      className={styles.avatar}
                      onError={(e) => {
                        e.target.src = '/default-avatar.png'
                      }}
                    />
                    <div className={styles.text}>
                      <p className={styles.username}>{user.username}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className={styles.list}>
            {results.length === 0 ? (
              <p className={styles.empty}>No users found.</p>
            ) : (
              results.map((user) => (
                <div
                  key={user._id}
                  className={styles.item}
                  onClick={() => handleOpenUserProfile(user)}
                >
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.username}
                    className={styles.avatar}
                    onError={(e) => {
                      e.target.src = '/default-avatar.png'
                    }}
                  />
                  <div className={styles.text}>
                    <p className={styles.username}>{user.username}</p>
                    <p className={styles.name}>{user.fullName || ''}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
