import { createFileRoute } from '@tanstack/react-router'
import AddPatientForm from '../../pages/addPatient/AddPatient'

export const Route = createFileRoute('/_authenticated/addPatient')({
  component: AddPatientForm,
})

