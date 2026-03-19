import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen';
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './app/Providers/AuthContext';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


function InnerApp() {
  const auth = useAuth()
  if (auth.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Initializing Secure Session...</p>
      </div>
    )
  }

  return <RouterProvider router={router} context={{ auth }} />
}


const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </StrictMode>,
  )
}
