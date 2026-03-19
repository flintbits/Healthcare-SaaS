import { Link, useNavigate } from "@tanstack/react-router";
import useFormEngine from "../../../app/hooks/useFormEngine";
import type { AuthFieldType } from "../types/auth.types";
import type { LucideIcon } from "lucide-react";
import Typography from "../../../shared/ui/Typography/Typography";
import { TextField } from "../../../shared/ui/Inputs/TextField/TextField";
import { Button } from "../../../shared/ui/Button/Button";

type AuthFormProps = {
  schema: (AuthFieldType & {
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
  })[];
  formType: string;
};

export default function AuthForm({
  schema,
  formType,
}: AuthFormProps) {
  const { formData, onChange, errors, checkAllFields } =
    useFormEngine<AuthFieldType>(schema);

  const navigate = useNavigate();

  const isLogin = formType === "login";

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validationErrors = checkAllFields();

    if (Object.values(validationErrors).some(Boolean))
      return;
  };

  return (
    <section className="w-full max-w-md mx-auto flex flex-col">
      {isLogin && (
        <p className="text-sm text-gray-500 mb-2">
          use: test5@mail.com and 12345678
        </p>
      )}

      <Typography as="h1" weight="bold">
        {isLogin
          ? "Access Your Account"
          : "Create Your Account"}
      </Typography>

      {/* form */}
      <form
        onSubmit={handleLogin}
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

      </form>
      <Button variant="accent">Submit</Button>

      {/* bottom link */}
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
    </section>
  );
}