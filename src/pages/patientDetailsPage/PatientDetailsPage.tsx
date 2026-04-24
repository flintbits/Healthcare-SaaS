import { useCallback, useEffect, useState } from "react";

import useFormEngine from "../../app/hooks/useFormEngine";
import type { Appointment } from "../../entities/Appointment.entity";
import type { Visit } from "../../entities/Visit.entity";
import { showNotification } from "../../services/notification.service";
import type { BaseField } from "../../shared/validation-engine/types/rules.type";
import { useAppointmentStore } from "../../store/appointment.store";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";
import { PatientFormSchema } from "../addPatient/schema/addPatient.schema";
import { AppointmentSchedule } from "./components/AppointmentSchedule";
import { PatientDetailsModals } from "./components/PatientDetailsModals";
import { PatientProfileHeader } from "./components/PatientProfileHeader";
import { VisitTimeline } from "./components/VisitTimeline";
import { AppointmentFormSchema } from "./schema/addAppointment.schema";
import { AddVisitSchema } from "./schema/addVisit.schema";

interface PatientDetailsPageProps {
  patientId: string;
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
    AddVisitSchema as BaseField[]
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
  const [editLoading, setEditLoading] = useState(false);

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
      setEditLoading(true);

      const errors = editCheckAllFields();
      if (Object.values(errors).some(Boolean)) {
        setEditLoading(false);
        return;
      }

      try {
        await updatePatient(patientId, editFormData);
        setOpenEditModal(false);
        showNotification(
          "Patient Updated",
          "Patient details have been saved successfully."
        );
      } catch (err) {
        console.error(err);
        showNotification(
          "Update Failed",
          "Could not update patient. Please try again."
        );
      } finally {
        setEditLoading(false);
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
      <PatientProfileHeader
        selectedPatient={selectedPatient}
        visitsCount={visits.length}
        onEdit={() => setOpenEditModal(true)}
        onDelete={handleDelete}
        onAddVisit={() => setOpenModal(true)}
        onAddAppointment={() => setOpenAppointmentModal(true)}
      />

      <VisitTimeline visits={visits} />

      <AppointmentSchedule appointments={appointments} />

      <PatientDetailsModals
        openVisitModal={openModal}
        openEditModal={openEditModal}
        openAppointmentModal={openAppointmentModal}
        onCloseVisitModal={() => setOpenModal(false)}
        onCloseEditModal={() => setOpenEditModal(false)}
        onCloseAppointmentModal={() => setOpenAppointmentModal(false)}
        formData={formData}
        onChange={onChange}
        errors={errors}
        handleSubmit={handleSubmit}
        editFormData={editFormData}
        editOnChange={editOnChange}
        editErrors={editErrors}
        handleEditSubmit={handleEditSubmit}
        editLoading={editLoading}
        appointmentFormData={appointmentFormData}
        appointmentOnChange={appointmentOnChange}
        appointmentErrors={appointmentErrors}
        handleAppointmentSubmit={handleAppointmentSubmit}
      />
    </div>
  );
}
