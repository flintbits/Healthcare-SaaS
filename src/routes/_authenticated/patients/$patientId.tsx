import { createFileRoute } from '@tanstack/react-router';
import PatientDetailsPage from '../../../pages/patientDetailsPage/PatientDetailsPage';

export const Route = createFileRoute('/_authenticated/patients/$patientId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { patientId } = Route.useParams();

  return <PatientDetailsPage patientId={patientId} />
}
