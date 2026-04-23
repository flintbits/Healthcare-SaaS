import {
  Activity,
  CalendarDays,
  Clock3,
  Edit3,
  Plus,
  Stethoscope,
  Trash2,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import useFormEngine from "../../app/hooks/useFormEngine";
import type { Appointment } from "../../entities/Appointment.entity";
import type { Visit } from "../../entities/Visit.entity";
import FormComponent from "../../features/Form/FormComponent";
import type { FieldWithIconType } from "../../features/Form/FormComponent.types";
import { Button } from "../../shared/ui/Button/Button";
import Modal from "../../shared/ui/modal/Modal";
import type { BaseField } from "../../shared/validation-engine/types/rules.type";
import { useAppointmentStore } from "../../store/appointment.store";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";
import { PatientFormSchema } from "../addPatient/schema/addPatient.schema";
import { AppointmentFormSchema } from "./schema/addAppointment.schema";
import { AddVisitSchema } from "./schema/addVisit.schema";

interface PatientDetailsPageProps {
  patientId: string;
}

const schema = AddVisitSchema;

function getStatusStyles(status?: string) {
  const value = status?.toLowerCase();

  if (value === "critical") {
    return "border-red-400/20 bg-red-400/10 text-red-300";
  }

  if (value === "discharged") {
    return "border-white/10 bg-white/[0.03] text-white/60";
  }

  return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
}

export default function PatientDetailsPage({
  patientId,
}: PatientDetailsPageProps) {
  const [openModal, setOpenModal] =
    useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);

  const {
    selectedPatient,
    fetchPatientById,
    updatePatient,
    deletePatient,
    loading: patientLoading,
  } = usePatientStore();

  const {
    formData,
    onChange,
    errors,
    checkAllFields,
  } = useFormEngine<BaseField>(
    schema as BaseField[]
  );

  const {
    formData: editFormData,
    onChange: editOnChange,
    errors: editErrors,
    checkAllFields: editCheckAllFields,
    setFormData: setEditFormData,
  } = useFormEngine<BaseField>(
    PatientFormSchema as BaseField[]
  );

  const {
    formData: appointmentFormData,
    onChange: appointmentOnChange,
    errors: appointmentErrors,
    checkAllFields: appointmentCheckAllFields,
    setFormData: setAppointmentFormData,
  } = useFormEngine<BaseField>(
    AppointmentFormSchema as BaseField[]
  );

  const {
    visits,
    fetchVisitsByPatientId,
    createVisit,
    loading: visitLoading,
  } = useVisitStore();

  const {
    appointments,
    fetchAppointmentsByPatientId,
    createAppointment,
    loading: appointmentLoading,
  } = useAppointmentStore();

  useEffect(() => {
    if (!patientId) return;

    fetchPatientById(patientId);
    fetchVisitsByPatientId(patientId);
    fetchAppointmentsByPatientId(patientId);
  }, [patientId]);

  useEffect(() => {
    if (selectedPatient) {
      setEditFormData(selectedPatient);
      setAppointmentFormData({
        patientId,
        patientName: selectedPatient.name,
        doctor: selectedPatient.doctor,
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        status: "scheduled",
        notes: "",
      });
    }
  }, [selectedPatient, setEditFormData, setAppointmentFormData, patientId]);

  const handleSubmit = useCallback(
    async (
      e: React.SubmitEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      const errors =
        checkAllFields();

      if (
        Object.values(errors).some(Boolean)
      )
        return;

      try {
        await createVisit({
          patientId,
          ...formData,
        } as Visit);

        setOpenModal(false);
      } catch (err) {
        console.error(err);
      }
    },
    [checkAllFields, formData]
  );

  const handleEditSubmit = useCallback(
    async (
      e: React.SubmitEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      const errors = editCheckAllFields();

      if (Object.values(errors).some(Boolean)) return;

      try {
        await updatePatient(patientId, editFormData);
        setOpenEditModal(false);
      } catch (err) {
        console.error(err);
      }
    },
    [editCheckAllFields, editFormData, patientId, updatePatient]
  );

  const handleAppointmentSubmit = useCallback(
    async (
      e: React.SubmitEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      const errors = appointmentCheckAllFields();

      if (Object.values(errors).some(Boolean)) return;

      try {
        await createAppointment({
          ...appointmentFormData,
          patientId,
        } as Appointment);
        setOpenAppointmentModal(false);
      } catch (err) {
        console.error(err);
      }
    },
    [appointmentCheckAllFields, appointmentFormData, patientId, createAppointment]
  );

  const handleDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(patientId);
        // After delete, selectedPatient is null, so it will show "Patient not found."
      } catch (err) {
        console.error(err);
      }
    }
  }, [patientId, deletePatient]);

  if (
    patientLoading ||
    visitLoading
  ) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-white/45">
        Loading patient profile...
      </div>
    );
  }

  if (!selectedPatient) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-white/45">
        Patient not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* top profile */}
      <section className="rounded-4xl border border-white/8 bg-white/3 p-6 backdrop-blur-2xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          {/* left */}
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/3 text-white">
              <UserRound size={24} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
                Patient Profile
              </p>

              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white">
                {selectedPatient.name}
              </h1>

              <p className="mt-3 text-sm text-white/55">
                ID: {
                  selectedPatient.id
                }
              </p>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium capitalize ${getStatusStyles(
                selectedPatient.status
              )}`}
            >
              {
                selectedPatient.status
              }
            </span>

            <Button
              onClick={() =>
                setOpenEditModal(true)
              }
              variant="outline"
            >
              <Edit3 size={16} />
              <span className="ml-2">
                Edit Patient
              </span>
            </Button>

            <Button
              onClick={handleDelete}
              variant="ghost"
              className="text-red-300 hover:text-red-200"
            >
              <Trash2 size={16} className="text-red-500" />
              <span className="ml-2 text-red-500">
                Delete Patient
              </span>
            </Button>

            <Button
              onClick={() =>
                setOpenModal(true)
              }
            >
              <Plus size={16} />
              <span className="ml-2">
                Add Visit
              </span>
            </Button>

            <Button
              onClick={() =>
                setOpenAppointmentModal(true)
              }
              variant="outline"
            >
              <CalendarDays size={16} />
              <span className="ml-2">
                Add Appointment
              </span>
            </Button>
          </div>
        </div>

        {/* metrics */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
            <p className="text-xs text-white/35">
              Age
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {
                selectedPatient.age
              }
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
            <p className="text-xs text-white/35">
              Assigned Doctor
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              {
                selectedPatient.doctor
              }
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
            <p className="text-xs text-white/35">
              Total Visits
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {visits.length}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-4xl border border-white/8 bg-white/3 p-6 backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
              Medical History
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Visit Timeline
            </h2>
          </div>

          <div className="text-sm text-white/45">
            {visits.length} Records
          </div>
        </div>

        {visits.length === 0 ? (
          <div className="rounded-3xl border border-white/8 bg-white/2 p-10 text-center text-sm text-white/40">
            No visits recorded yet.
          </div>
        ) : (
          <div className="space-y-4">
            {visits.map(
              (visit) => {
                const date =
                  visit.visitDate
                    ? visit.visitDate.toDate()
                    : null;

                const formatted =
                  date
                    ? date.toLocaleDateString()
                    : "Unknown";

                return (
                  <div
                    key={visit.id}
                    className="rounded-3xl border border-white/8 bg-white/2 p-5 transition hover:bg-white/3"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* left */}
                      <div>
                        <div className="flex items-center gap-2 text-white">
                          <Stethoscope size={16} />

                          <span className="font-medium">
                            {
                              visit.doctor
                            }
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/45">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays size={14} />
                            {
                              formatted
                            }
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <Clock3 size={14} />
                            Consultation
                          </span>
                        </div>
                      </div>

                      {/* right */}
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                          Fee: $
                          {visit.fee}
                        </span>

                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-white/65">
                          <Activity size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      <section className="rounded-4xl border border-white/8 bg-white/3 p-6 backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
              Appointments
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Scheduled Appointments
            </h2>
          </div>

          <div className="text-sm text-white/45">
            {appointments.length} Records
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="rounded-3xl border border-white/8 bg-white/2 p-10 text-center text-sm text-white/40">
            No appointments scheduled yet.
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map(
              (appointment) => {
                const date = appointment.appointmentDate
                  ? new Date(appointment.appointmentDate)
                  : null;

                const formatted =
                  date
                    ? date.toLocaleDateString()
                    : "Unknown";

                return (
                  <div
                    key={appointment.id}
                    className="rounded-3xl border border-white/8 bg-white/2 p-5 transition hover:bg-white/3"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* left */}
                      <div>
                        <div className="flex items-center gap-2 text-white">
                          <Stethoscope size={16} />

                          <span className="font-medium">
                            {
                              appointment.doctor
                            }
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/45">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays size={14} />
                            {
                              formatted
                            }
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <Clock3 size={14} />
                            {appointment.appointmentTime}
                          </span>
                        </div>

                        <div className="mt-2 text-sm text-white/60">
                          Reason: {appointment.reason}
                        </div>
                      </div>

                      {/* right */}
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium capitalize ${appointment.status === "confirmed"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : appointment.status === "scheduled"
                              ? "border-blue-400/20 bg-blue-400/10 text-blue-300"
                              : "border-gray-400/20 bg-gray-400/10 text-gray-300"
                          }`}>
                          {appointment.status}
                        </span>

                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-white/65">
                          <Activity size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {openModal && (
        <Modal
          onClose={() =>
            setOpenModal(false)
          }
          title="Add Patient Visit"
        >
          <FormComponent
            schema={
              schema as FieldWithIconType[]
            }
            formData={formData}
            handleSubmit={
              handleSubmit
            }
            onChange={onChange}
            errors={errors}
            twoColumn
            submitText="Create Visit"
          />
        </Modal>
      )}

      {openEditModal && (
        <Modal
          onClose={() =>
            setOpenEditModal(false)
          }
          title="Edit Patient Details"
        >
          <FormComponent
            schema={
              PatientFormSchema as FieldWithIconType[]
            }
            formData={editFormData}
            handleSubmit={
              handleEditSubmit
            }
            onChange={editOnChange}
            errors={editErrors}
            twoColumn
            submitText="Update Patient"
          />
        </Modal>
      )}

      {openAppointmentModal && (
        <Modal
          onClose={() =>
            setOpenAppointmentModal(false)
          }
          title="Add Patient Appointment"
        >
          <FormComponent
            schema={
              AppointmentFormSchema as FieldWithIconType[]
            }
            formData={appointmentFormData}
            handleSubmit={
              handleAppointmentSubmit
            }
            onChange={appointmentOnChange}
            errors={appointmentErrors}
            twoColumn
            submitText="Create Appointment"
          />
        </Modal>
      )}
    </div>
  );
}
