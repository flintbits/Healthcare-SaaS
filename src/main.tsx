import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/chart';
import { AuthProvider, useAuth } from './app/Providers/AuthContext';
import './index.css';
import { routeTree } from './routeTree.gen';
import { registerSW } from './service-worker/registerSW';

// Create router instance and attach route tree
// auth will be injected later from context
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!
  }
})

// register service worker
registerSW()

// Tell TanStack router about our router type
// needed for type safety in routes
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Separate component so we can access auth context
// before rendering the router
function InnerApp() {
  const auth = useAuth()
  // while auth state is loading, show simple screen
  // prevents routes from rendering before session check
  if (auth.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Initializing Secure Session...</p>
      </div>
    )
  }
  // once auth is ready, pass it to router context
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
