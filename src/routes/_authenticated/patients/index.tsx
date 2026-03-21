import { createFileRoute } from '@tanstack/react-router'
import ViewPatients from '../../../pages/viewPatients/ViewPatients'

export const Route = createFileRoute('/_authenticated/patients/')({
  component: ViewPatients,
})
