import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthContextType } from '../app/Providers/AuthContext'
import { GlobalLoader } from '../features/GlobalLoader/GlobalLoader'

interface MyRouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <GlobalLoader />
      <Outlet />
    </>
  )
}
