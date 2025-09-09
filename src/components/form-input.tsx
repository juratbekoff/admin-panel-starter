import { cn } from "@/lib/utils";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { Input } from "./ui/input";
import type { ReactNode } from "react";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  placeholder?: string;
  form: UseFormReturn<TFieldValues>;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  type?: string;
  mask?: string;
  currency?: boolean;
  onValueChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  className,
  labelClassName,
  required = false,
  type = "text",
  mask,
  currency,
  onValueChange,
  onFocus,
  onBlur,
}: FormInputProps<TFieldValues>) {
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
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <Input
                {...field}
                value={field.value || ""}
                placeholder={placeholder}
                className={cn(
                  "",
                  className,
                  error && "border border-red-500 focus:border-red-500"
                )}
                type={type}
                mask={mask}
                currency={currency}
                onFocus={onFocus}
                onBlur={onBlur}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onValueChange) {
                    onValueChange(value);
                  }
                }}
              />
              {error && (
                <span className="text-xs text-red-500 mt-1">
                  {error.message}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
