import { createFileRoute, redirect } from '@tanstack/react-router'
import DashboardLayout from '../layout/DashboardLayout'

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context, location }) => {

        if (!context.auth.user) {
            throw redirect({
                to: '/login',
                search: { redirect: location.href },
            })
        }
    },

    component: DashboardLayout
})
