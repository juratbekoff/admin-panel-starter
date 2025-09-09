import { cn } from "@/lib/utils";
import {
  type FieldValues,
  type FieldPath,
  type UseFormReturn,
  Controller,
} from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface FormTextareaProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  form: UseFormReturn<TFieldValues>;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}

export function FormTextarea<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  className,
  labelClassName,
  required = false,
}: FormTextareaProps<TFieldValues>) {
  return (
    <div className="flex flex-col gap-1 w-full text-sm">
      {label && (
        <span className={cn(labelClassName)}>
          {label}:{required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              {...field}
              placeholder={placeholder}
              className={cn("bg-neutral-50 min-h-32", className)}
            />
            {error && (
              <span className="text-xs text-red-500 mt-1">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
}
