import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/chart';
import { AuthProvider, useAuth } from './app/Providers/AuthContext';
import { GlobalLoader } from './features/GlobalLoader/GlobalLoader';
import './index.css';
import { routeTree } from './routeTree.gen';
import { registerSW } from './service-worker/registerSW';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!
  }
})

registerSW()

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
      <AuthProvider >
        <GlobalLoader />
        <InnerApp />
      </AuthProvider>
    </StrictMode>,
  )
}
