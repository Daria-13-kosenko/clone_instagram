import { createContext, useContext, useEffect, useState } from 'react'
import { getMyProfile } from '../src/api/userApi'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const fetchProfile = async () => {
    try {
      const profile = await getMyProfile()
      setUser(profile)
    } catch (error) {
      setUser(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      fetchProfile()
    }
  }, [])

  const login = async (token) => {
    localStorage.setItem('token', token)
    await fetchProfile()
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
