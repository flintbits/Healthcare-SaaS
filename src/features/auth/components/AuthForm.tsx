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
    <section className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-0 flex flex-col space-y-8">
      <Typography as="h1" weight="bold" className="text-3xl font-semibold leading-tight sm:text-4xl">
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
        submitText={isLogin ? "Sign In" : "Get Started"}
      />

      <Typography
        as="p"
        weight="light"
        size="text-base"
        className="text-white/70"
      >
        {isLogin ? (
          <>Don&apos;t have an account? {" "}
            <Link
              to="/signup"
              className="text-white/90 underline decoration-white/15 transition hover:text-white"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>Have an account? {" "}
            <Link
              to="/login"
              className="text-white/90 underline decoration-white/15 transition hover:text-white"
            >
              Log in
            </Link>
          </>
        )}
      </Typography>

      <Typography
        as="p"
        weight="light"
        size="text-base"
        className="pt-1 text-white/70"
      >
        <Link
          to="/"
          className="text-white/90 underline decoration-white/15 transition hover:text-white"
        >
          Back to Home
        </Link>
      </Typography>

    </section>
  );
}
