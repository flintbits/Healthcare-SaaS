import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../features/auth/components/AuthLayout'

export const Route = createFileRoute('/_without-navbar/login')({
    component: () => <AuthLayout type="login" />,
})
