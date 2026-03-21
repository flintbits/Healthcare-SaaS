import { Button } from "../../shared/ui/Button/Button";
import { TextField } from "../../shared/ui/Inputs/TextField/TextField";
import Typography from "../../shared/ui/Typography/Typography";
import type { FieldWithIconType } from "./FormComponent.types";

type FormProps = {
  schema: FieldWithIconType[]
  formData: Record<string, any>
  errors: Record<string, any>
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  onChange: (val: string, fieldId: string) => void
};



export default function FormComponent({
  schema,
  formData,
  errors,
  handleSubmit,
  onChange
}: FormProps) {

  return (
    <section className="w-full">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-3"
      >
        {schema.map((field) => {
          if (field.type === "select") {
            return (
              <section key={field.id} className="flex flex-col gap-1 w-full">
                {field.label && (
                  <label htmlFor={field.id} className="text-sm font-light text-gray-500">
                    {field.label}
                  </label>
                )}

                <select
                  id={field.id}
                  value={formData[field.id] ?? ""}
                  onChange={(e) => onChange(e.target.value, field.id)}
                  className={[
                    "rounded-md border bg-white px-3 py-2 text-sm font-light",
                    errors[field.id] ? "border-red-600" : "border-gray-400"
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <option value="" disabled>
                    {field.placeholder ?? "Select an option"}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <Typography
                  as="p"
                  weight="light"
                  size="text-xs"
                  className={errors[field.id] ? "text-red-600" : ""}
                  style={{
                    visibility: errors[field.id] ? "visible" : "hidden",
                    minHeight: errors[field.id] ? 14 : 0
                  }}
                >
                  {errors[field.id] ?? ""}
                </Typography>
              </section>
            )
          }

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


    </section>
  );
}
