import { useCallback, useEffect, useState } from "react";
import useFormEngine from "../../app/hooks/useFormEngine";
import type { Visit } from "../../entities/Visit.entity";
import FormComponent from "../../features/Form/FormComponent";
import type { FieldWithIconType } from "../../features/Form/FormComponent.types";
import { Button } from "../../shared/ui/Button/Button";
import Modal from "../../shared/ui/modal/Modal";
import type { BaseField } from "../../shared/validation-engine/types/rules.type";
import { usePatientStore } from "../../store/patient.store";
import { useVisitStore } from "../../store/visit.store";
import { AddVisitSchema } from "./schema/addVisit.schema";

interface PatientDetailsPageProps {
  patientId: string
}

const schema = AddVisitSchema

export default function PatientDetailsPage({ patientId }: PatientDetailsPageProps) {
  const [openModal, setOpenModal] = useState(false)
  const { selectedPatient, fetchPatientById, loading: patientLoading } = usePatientStore();
  const { formData, onChange, errors, checkAllFields } = useFormEngine<BaseField>(schema as BaseField[]);
  const { visits, fetchVisitsByPatientId, createVisit, loading: visitLoading } = useVisitStore();

  useEffect(() => {
    if (!patientId) return;
    fetchPatientById(patientId);
    fetchVisitsByPatientId(patientId);
  }, [patientId]);

  const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = checkAllFields()
    if (Object.values(errors).some(Boolean)) return

    const visitdata = { patientId, ...formData }
    try {
      await createVisit(visitdata as Visit)
      setOpenModal(false)
    } catch (err) {
      console.error(err)
    }
  },
    [checkAllFields, formData]
  )

  if (patientLoading || visitLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!selectedPatient) {
    return <div className="p-6">Patient not found</div>;
  }

  return (
    <div>
      <div className=" rounded-xl p-6 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">{selectedPatient.name}</h1>
          <div className="text-gray-600 mt-2">
            <p>Age: {selectedPatient.age}</p>
            <p>Doctor: {selectedPatient.doctor}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm`}
        >
          {selectedPatient.status}
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-4">
          Medical History
        </h2>

        <div className="space-y-3">

          {visits.map((visit) => {
            const date = visit.visitDate ? visit.visitDate.toDate() : null;
            const day = date?.getDate();
            const month = date?.toLocaleString("default", {
              month: "short",
            });
            const year = date?.getFullYear();
            return (
              <div
                key={visit.id}
                className=" bg-(--color-bg-ternary)/10 rounded-md p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {visit.doctor}
                  </p>

                  <p className="text-sm text-gray-500">
                    {day} / {month} / {year}
                  </p>
                </div>

                <div className="flex gap-2">

                  <button className="bg-green-300 px-3 py-1 rounded-lg">
                    Fee: {visit.fee}
                  </button>

                </div>
              </div>
            );
          })}

        </div>
      </div>



      <div className="bg-white rounded-2xl p-6 flex gap-3">
        <Button onClick={() => setOpenModal(true)}>
          Add Visit
        </Button>
      </div>

      {openModal && <Modal onClose={() => setOpenModal(false)} title="Enter visitation details">

        <FormComponent
          schema={schema as FieldWithIconType[]}
          formData={formData}
          handleSubmit={handleSubmit}
          onChange={onChange}
          errors={errors}
        />


      </Modal>}

    </div>
  );
}
