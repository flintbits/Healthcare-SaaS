import type React from "react";
import FormComponent from "../../../features/Form/FormComponent";
import type { FieldWithIconType } from "../../../features/Form/FormComponent.types";
import Modal from "../../../shared/ui/modal/Modal";
import { PatientFormSchema } from "../../addPatient/schema/addPatient.schema";
import { AppointmentFormSchema } from "../schema/addAppointment.schema";
import { AddVisitSchema } from "../schema/addVisit.schema";

export function PatientDetailsModals({
  openVisitModal,
  openEditModal,
  openAppointmentModal,
  onCloseVisitModal,
  onCloseEditModal,
  onCloseAppointmentModal,
  formData,
  onChange,
  errors,
  handleSubmit,
  editFormData,
  editOnChange,
  editErrors,
  handleEditSubmit,
  editLoading,
  appointmentFormData,
  appointmentOnChange,
  appointmentErrors,
  handleAppointmentSubmit,
}: {
  openVisitModal: boolean;
  openEditModal: boolean;
  openAppointmentModal: boolean;
  onCloseVisitModal: () => void;
  onCloseEditModal: () => void;
  onCloseAppointmentModal: () => void;
  formData: Record<string, any>;
  onChange: (value: string, field: string) => void;
  errors: Record<string, string>;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  editFormData: Record<string, any>;
  editOnChange: (value: string, field: string) => void;
  editErrors: Record<string, string>;
  handleEditSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  editLoading: boolean;
  appointmentFormData: Record<string, any>;
  appointmentOnChange: (value: string, field: string) => void;
  appointmentErrors: Record<string, string>;
  handleAppointmentSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <>
      {openVisitModal && (
        <Modal onClose={onCloseVisitModal} title="Add Patient Visit">
          <FormComponent
            schema={AddVisitSchema as FieldWithIconType[]}
            formData={formData}
            handleSubmit={handleSubmit}
            onChange={onChange}
            errors={errors}
            twoColumn
            submitText="Create Visit"
          />
        </Modal>
      )}

      {openEditModal && (
        <Modal onClose={onCloseEditModal} title="Edit Patient Details">
          <FormComponent
            schema={PatientFormSchema as FieldWithIconType[]}
            formData={editFormData}
            handleSubmit={handleEditSubmit}
            onChange={editOnChange}
            errors={editErrors}
            twoColumn
            submitText={editLoading ? "Updating..." : "Update Patient"}
          />
        </Modal>
      )}

      {openAppointmentModal && (
        <Modal onClose={onCloseAppointmentModal} title="Add Patient Appointment">
          <FormComponent
            schema={AppointmentFormSchema as FieldWithIconType[]}
            formData={appointmentFormData}
            handleSubmit={handleAppointmentSubmit}
            onChange={appointmentOnChange}
            errors={appointmentErrors}
            twoColumn
            submitText="Create Appointment"
          />
        </Modal>
      )}
    </>
  );
}
