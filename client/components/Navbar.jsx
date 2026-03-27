import { Link } from 'react-router-dom'
import { useAuth } from '../contex/AuthContext.jsx'

const Navbar = () => {
  const { user, logout } = useAuth()

  return <nav style={{display: 'flex', gap: '16px', padding: '16px'}}>
    <Link to='/'>Home</Link>
    {user ? (
      <>
      <Link to='/profile'>Profile</Link>
      <button onClick={logout}>Logout</button>
      </>
    ) : (
      <>
      <Link to='/login'>Login</Link>
      <Link to= '/register'>Register</Link>
      </>
    )}
    
  </nav>
  )
}

export default Navbar