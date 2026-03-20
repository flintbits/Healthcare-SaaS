import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import useFormEngine from "../../app/hooks/useFormEngine";
import { usePatients } from "../../app/hooks/usePatients";
import FormComponent from "../../features/Form/FormComponent";
import type { FieldWithIconType } from "../../features/Form/FormComponent.types";
import type { BaseField } from "../../shared/validation-engine/types/rules.type";
import { PatientFormSchema } from "./schema/addPatient.schema";


const schema = PatientFormSchema

export default function AddPatientForm() {
  const { formData, onChange, errors, checkAllFields } = useFormEngine<BaseField>(schema as BaseField[]);
  console.log(errors)
  const { createPatient } = usePatients();

  const navigate = useNavigate();

  // const submitAuth = useCallback(async () => {
  //   if (!isLogin) {
  //     await handleSignup(formData.email, formData.password)
  //   } else {
  //     await handleLogin(formData.email, formData.password)
  //   }
  // }, [isLogin, formData, handleSignup, handleLogin])


  const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = checkAllFields()
    if (Object.values(errors).some(Boolean)) return

    try {
      await createPatient(formData)
    } catch (err) {
      console.error(err)
    }
  },
    [checkAllFields, formData, navigate]
  )

  return (
    <section className="w-full max-w-md mx-auto flex flex-col">

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
