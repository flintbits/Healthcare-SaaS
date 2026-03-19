import { Link, useNavigate } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { useCallback } from "react";
import useFormEngine from "../../../app/hooks/useFormEngine";
import { Button } from "../../../shared/ui/Button/Button";
import { TextField } from "../../../shared/ui/Inputs/TextField/TextField";
import Typography from "../../../shared/ui/Typography/Typography";

type AuthFormProps = {
  schema: (AuthFieldType & {
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
  })[];
  formType: string;
};

export default function AddPatient({ schema, formType }: AuthFormProps) {

  const { formData, onChange, errors, checkAllFields } = useFormEngine<AuthFieldType>(schema);
  const navigate = useNavigate();
  const isLogin = formType === "login";


  const submitAuth = useCallback(async () => {
    if (!isLogin) {
      await handleSignup(formData.email, formData.password)
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
    <section className="w-full max-w-md mx-auto flex flex-col">

      <Typography as="h1" weight="bold">
        {isLogin
          ? "Access Your Account"
          : "Create Your Account"}
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-3"
      >
        {schema.map((field) => {
          const fieldType = field.type;

          return <TextField
            key={field.id}
            id={field.id}
            value={formData[field.id] ?? ""}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            isPassword={!!field.isPassword}
            onChange={(e) =>
              onChange(
                e.target.value,
                field.id
              )
            }
            LeftIcon={field.leftIcon}
            RightIcon={field.rightIcon}
            error={!!errors[field.id]}
            helperText={errors[field.id] ?? ""}
          />

        })}

        <Button type="submit" variant="accent">Submit</Button>
      </form>

      {formType === "login" ? (
        <Typography
          as="p"
          weight="light"
          size="text-base"
          className="mt-3"
        >
          Dont have an Account?
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
    </section>
  );
}
