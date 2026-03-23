import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import useFormEngine from "../../../app/hooks/useFormEngine";
import Typography from "../../../shared/ui/Typography/Typography";
import type { BaseField } from "../../../shared/validation-engine/types/rules.type";
import FormComponent from "../../Form/FormComponent";
import type { FieldWithIconType } from "../../Form/FormComponent.types";
import { handleLogin, handleSignup } from "../services/auth.service";


type FormProps = {
  schema: FieldWithIconType[]
  formType: string;
};

export default function AuthForm({ schema, formType, }: FormProps) {
  const { formData, onChange, errors, checkAllFields } = useFormEngine<BaseField>(schema as BaseField[]);
  const navigate = useNavigate();

  const isLogin = formType === "login";

  const submitAuth = useCallback(async () => {
    if (!isLogin) {
      await handleSignup(formData.name, formData.email, formData.password)
    } else {
      await handleLogin(formData.email, formData.password)
    }
  }, [isLogin, formData, handleSignup, handleLogin])


  const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = checkAllFields()
    if (Object.values(errors).some(Boolean)) return

    try {
      await submitAuth()

      navigate({
        to: "/dashboard",
        replace: true,
      })
    } catch (err) {
      console.error(err)
    }
  },
    [submitAuth, navigate]
  )

  return (
    <section className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-0 flex flex-col">
      <Typography as="h1" weight="bold">
        {isLogin
          ? "Access Your Account"
          : "Create Your Account"}
      </Typography>

      <FormComponent
        schema={schema}
        formData={formData}
        handleSubmit={handleSubmit}
        onChange={onChange}
        errors={errors}
      />

      {formType === "login" ? (
        <Typography
          as="p"
          weight="light"
          size="text-base"
          className="mt-3"
        >
          Dont have an Account?{" "}
          <Link
            to="/signup"
            className="text-(--color-accent) no-underline"
          >
            Sign up
          </Link>
        </Typography>
      ) : (
        <Typography
          as="p"
          weight="light"
          size="text-base"
          className="mt-3"
        >
          Have an Account?{" "}
          <Link
            to="/login"
            className="text-(--color-accent) no-underline"
          >
            Log In
          </Link>
        </Typography>
      )}

      <Typography
        as="p"
        weight="light"
        size="text-base"
        className="mt-3"
      >
        <Link
          to="/"
          className="text-(--color-accent) no-underline"
        >
          Go to Home?
        </Link>
      </Typography>

    </section>
  );
}
