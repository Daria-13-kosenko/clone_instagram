import Sidebar from '../Sidebar/Sidebar.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './AppLayout.module.css'
import CreatePostForm from '../CreatePostForm/CreatePostForm.jsx'
import { useState } from 'react'

const AppLayout = ({ children, onPostCreated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      <div className={styles.contentArea}>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
      <CreatePostForm
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false)
        }}
        onPostCreated={onPostCreated}
      />
    </div>
  )
}
export default AppLayout
