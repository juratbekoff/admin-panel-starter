import { cn } from "@/lib/utils";

import {
  type FieldValues,
  type FieldPath,
  type UseFormReturn,
  Controller,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectItem {
  value: string;
  label: string;
}

interface FormSelectProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  items: SelectItem[];
  form: UseFormReturn<TFieldValues>;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  containerClassName?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void; // Add this line
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  label,
  items,
  form,
  className,
  labelClassName,
  containerClassName,
  placeholder,
  required = false,
  onValueChange, // Add this line
}: FormSelectProps<TFieldValues>) {
  return (
    <div className={cn("flex flex-col gap-1 text-sm", containerClassName)}>
      {label && (
        <span className={cn(labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                if (onValueChange) {
                  onValueChange(value);
                }
              }}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger className={cn(" shadow-none rounded", className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {items?.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && (
              <span className="text-xs text-red-500 mt-1">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
}
