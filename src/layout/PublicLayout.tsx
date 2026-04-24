import { Outlet, useLocation } from '@tanstack/react-router'
import PageTransition from '../components/PageTransition'
import Navbar from './Navbar'

export default function PublicLayout() {
  const location = useLocation()
  const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <main>
      {!isLoginOrSignup && <Navbar />}
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
  )
}
