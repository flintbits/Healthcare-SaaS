import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../features/auth/components/AuthLayout'

export const Route = createFileRoute('/_public/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AuthLayout type='login' />
}
