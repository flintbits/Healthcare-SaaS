import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../features/auth/components/AuthLayout'

export const Route = createFileRoute('/_public/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthLayout type='signup' />
}