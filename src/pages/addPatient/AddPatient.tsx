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
    <section className="w-full">
      <h1 className="text-2xl font-semibold">Fill Patient Info</h1>


      <FormComponent
        schema={PatientFormSchema as FieldWithIconType[]}
        formData={formData}
        handleSubmit={handleSubmit}
        onChange={onChange}
        errors={errors}
      />


    </section>
  );
}
