import { Button } from "../../shared/ui/Button/Button";
import { TextField } from "../../shared/ui/Inputs/TextField/TextField";
import Typography from "../../shared/ui/Typography/Typography";
import type { FieldWithIconType } from "./FormComponent.types";

type FormProps = {
  schema: FieldWithIconType[];
  formData: Record<string, any>;
  errors: Record<string, any>;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChange: (val: string, fieldId: string) => void;

  /* NEW */
  twoColumn?: boolean; // default false
  submitText?: string;
};

export default function FormComponent({
  schema,
  formData,
  errors,
  handleSubmit,
  onChange,
  twoColumn = false,
  submitText = "Submit",
}: FormProps) {
  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div
          className={[
            "grid gap-5",
            twoColumn
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1",
          ].join(" ")}
        >
          {schema.map((field) => {
            const fullWidth =
              field.type === "textarea" ||
              field.id === "notes";


            if (field.type === "select") {
              return (
                <section
                  key={field.id}
                  className={[
                    "flex w-full flex-col gap-2",
                    twoColumn && fullWidth
                      ? "md:col-span-2"
                      : "",
                  ].join(" ")}
                >
                  {field.label && (
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium text-white/65"
                    >
                      {field.label}
                    </label>
                  )}

                  <div className="relative">
                    <select
                      id={field.id}
                      value={formData[field.id] ?? ""}
                      onChange={(e) =>
                        onChange(
                          e.target.value,
                          field.id
                        )
                      }
                      className={[
                        "h-14 w-full appearance-none rounded-2xl border px-4 text-sm outline-none transition",
                        "border-white/10 bg-white/4 text-white backdrop-blur-2xl",
                        "hover:bg-white/6 focus:border-white/20 focus:bg-white/[0.07]",
                        errors[field.id]
                          ? "border-red-400/50"
                          : "",
                      ].join(" ")}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#0b0d12]"
                      >
                        {field.placeholder ??
                          "Select option"}
                      </option>

                      {field.options?.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-[#0b0d12]"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/35">
                      ▼
                    </span>
                  </div>

                  <Typography
                    as="p"
                    size="text-xs"
                    className={
                      errors[field.id]
                        ? "min-h-4 text-red-300"
                        : "min-h-4 text-white/30"
                    }
                  >
                    {errors[field.id] || " "}
                  </Typography>
                </section>
              );
            }


            if (field.type === "textarea") {
              return (
                <section
                  key={field.id}
                  className={[
                    "flex w-full flex-col gap-2",
                    twoColumn
                      ? "md:col-span-2"
                      : "",
                  ].join(" ")}
                >
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium text-white/65"
                  >
                    {field.label}
                  </label>

                  <textarea
                    id={field.id}
                    rows={5}
                    value={formData[field.id] ?? ""}
                    placeholder={
                      field.placeholder
                    }
                    onChange={(e) =>
                      onChange(
                        e.target.value,
                        field.id
                      )
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-sm text-white outline-none backdrop-blur-2xl transition placeholder:text-white/30 hover:bg-white/6 focus:border-white/20 focus:bg-white/[0.07]"
                  />

                  <Typography
                    as="p"
                    size="text-xs"
                    className={
                      errors[field.id]
                        ? "min-h-4 text-red-300"
                        : "min-h-4 text-white/30"
                    }
                  >
                    {errors[field.id] || " "}
                  </Typography>
                </section>
              );
            }

            /* DEFAULT INPUT */
            return (
              <div
                key={field.id}
                className={
                  twoColumn && fullWidth
                    ? "md:col-span-2"
                    : ""
                }
              >
                <TextField
                  id={field.id}
                  value={
                    formData[field.id] ?? ""
                  }
                  type={field.type}
                  label={field.label}
                  placeholder={
                    field.placeholder
                  }
                  isPassword={
                    !!field.isPassword
                  }
                  onChange={(e) =>
                    onChange(
                      e.target.value,
                      field.id
                    )
                  }
                  LeftIcon={field.leftIcon}
                  RightIcon={field.rightIcon}
                  error={
                    !!errors[field.id]
                  }
                  helperText={
                    errors[field.id] ?? ""
                  }
                />
              </div>
            );
          })}
        </div>

        {/* submit */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            className="h-14 w-full rounded-full text-sm font-medium"
          >
            {submitText}
          </Button>
        </div>
      </form>
    </section>
  );
}
