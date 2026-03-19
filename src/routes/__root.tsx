import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthContextType } from '../app/Providers/AuthContext'


interface MyRouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
