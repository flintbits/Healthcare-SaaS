import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import useFormEngine from "../../app/hooks/useFormEngine";
import type { Patient } from "../../entities/Patient.entity";
import FormComponent from "../../features/Form/FormComponent";
import type { FieldWithIconType } from "../../features/Form/FormComponent.types";
import type { BaseField } from "../../shared/validation-engine/types/rules.type";
import { usePatientStore } from "../../store/patient.store";
import { PatientFormSchema } from "./schema/addPatient.schema";


const schema = PatientFormSchema

export default function AddPatientForm() {
  const { formData, onChange, errors, checkAllFields } = useFormEngine<BaseField>(schema as BaseField[]);
  console.log(errors)
  const { createPatient } = usePatientStore();

  const navigate = useNavigate();


  const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = checkAllFields()
    if (Object.values(errors).some(Boolean)) return

    try {
      await createPatient(formData as Patient)
      navigate({ to: "/patients", replace: true, })
    } catch (err) {
      console.error(err)
    }
  },
    [checkAllFields, formData, navigate]
  )

  return (
    <div className="space-y-6">
      {/* header */}
      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
            Patient Registration
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">
            Add New Patient
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Register a new patient with complete medical information and care details.
          </p>
        </div>
      </section>

      <section className="w-full">
        <FormComponent
          schema={PatientFormSchema as FieldWithIconType[]}
          formData={formData}
          twoColumn={true}
          handleSubmit={handleSubmit}
          onChange={onChange}
          errors={errors}
        />
      </section>
    </div>
  );
}
