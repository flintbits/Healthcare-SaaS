import { Button } from "../../shared/ui/Button/Button";
import { TextField } from "../../shared/ui/Inputs/TextField/TextField";
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
    <section className="w-full max-w-md mx-auto flex flex-col">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-3"
      >
        {schema.map((field) => {
          // const fieldType = field.type;

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
