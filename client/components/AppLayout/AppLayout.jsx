import Sidebar from '../Sidebar/Sidebar.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './AppLayout.module.css'
import CreatePostForm from '../CreatePostForm/CreatePostForm.jsx'
import { useState } from 'react'

const AppLayout = ({ children, onPostCreated }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleOpenCreate = () => {
    setIsCreateOpen(true)
  }
  const handleCloseCreate = () => {
    setIsCreateOpen(false)
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar handleOpen={handleOpenCreate} />

      <div className={styles.contentArea}>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>

      <CreatePostForm
        isOpen={isCreateOpen}
        onClose={handleCloseCreate}
        onPostCreated={onPostCreated}
      />
    </div>
  )
}
export default AppLayout
