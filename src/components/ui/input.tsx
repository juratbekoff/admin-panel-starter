import * as React from "react";
import { cn } from "@/lib/utils";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline as IoEyeOnOutline } from "react-icons/io5";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  currency?: boolean;
  onValueChange?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      autoFocus,
      currency,
      mask,
      defaultValue,
      value,
      onChange,
      onValueChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    // Track the cursor position for proper cursor placement after masking
    const cursorPositionRef = React.useRef<number | null>(null);

    // Calculate max digits based on mask
    const getMaxDigits = (maskPattern: string | undefined): number => {
      if (!maskPattern) return Infinity;

      // Count number of digit placeholders (9's) in the mask
      return (maskPattern.match(/9/g) || []).length;
    };

    React.useEffect(() => {
      if (autoFocus) {
        const inputElement = internalRef.current;
        if (inputElement) {
          inputElement.focus();
        }
      }
    }, [autoFocus]);

    // Specialized phone number formatter
    const formatPhoneNumber = (input: string, maxDigits: number): string => {
      // Keep only digits and limit to max length
      const digits = input.replace(/\D/g, "").substring(0, maxDigits);

      // Build phone number with spaces according to the "999 999 99 99" format
      let formatted = "";

      for (let i = 0; i < digits.length; i++) {
        // Add spaces at the appropriate positions
        if (i === 3 || i === 6 || i === 8) {
          formatted += " ";
        }
        formatted += digits[i];
      }

      return formatted;
    };

    const formatCurrency = (inputValue: string | number): string => {
      if (!inputValue) return "";

      return new Intl.NumberFormat("uz-UZ", {
        style: "decimal",
        maximumFractionDigits: 0,
      }).format(Number(inputValue));
    };

    // Apply mask based on the mask pattern
    const applyMask = (rawValue: string, maskPattern: string): string => {
      const maxDigits = getMaxDigits(maskPattern);

      // If the mask is the phone number format, use the specialized formatter
      if (maskPattern === "999 999 99 99") {
        return formatPhoneNumber(rawValue, maxDigits);
      }

      if (!rawValue) return "";

      // Keep only digits and limit to max length
      const digitsOnly = rawValue.replace(/\D/g, "").substring(0, maxDigits);

      let result = "";
      let digitIndex = 0;

      // Apply the mask
      for (
        let i = 0;
        i < maskPattern.length && digitIndex < digitsOnly.length;
        i++
      ) {
        if (maskPattern[i] === "9") {
          result += digitsOnly[digitIndex++];
        } else {
          result += maskPattern[i];
        }
      }

      return result;
    };

    // Extract raw value (digits only)
    const extractRawValue = (maskedValue: string): string => {
      return maskedValue.replace(/\D/g, "");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      // Save cursor position before formatting
      const cursorPosition = e.target.selectionStart;
      if (cursorPosition !== null) {
        cursorPositionRef.current = cursorPosition;
      }

      let inputValue = e.target.value;
      let processedValue = inputValue;

      if (mask) {
        // Get digits only for form value and limit to max length
        const maxDigits = getMaxDigits(mask);
        processedValue = extractRawValue(inputValue).substring(0, maxDigits);

        // Apply mask for display
        const maskedValue = applyMask(processedValue, mask);

        // Update the input display immediately
        e.target.value = maskedValue;

        // Restore cursor position
        setTimeout(() => {
          if (internalRef.current && cursorPositionRef.current !== null) {
            // Adjust for added spaces before cursor
            let spacesBefore = 0;
            if (mask === "999 999 99 99") {
              const rawCursorPos = extractRawValue(
                inputValue.substring(0, cursorPositionRef.current)
              ).length;

              // Calculate spaces that would be added before this position
              if (rawCursorPos > 8) spacesBefore = 3;
              else if (rawCursorPos > 6) spacesBefore = 2;
              else if (rawCursorPos > 3) spacesBefore = 1;

              internalRef.current.setSelectionRange(
                Math.min(rawCursorPos + spacesBefore, maskedValue.length),
                Math.min(rawCursorPos + spacesBefore, maskedValue.length)
              );
            }
          }
        }, 0);
      } else if (currency) {
        processedValue = inputValue.replace(/[^0-9]/g, "");
      }

      if (onChange) {
        onChange({
          ...e,
          target: { ...e.target, value: processedValue },
        });
      }

      if (onValueChange) {
        onValueChange(processedValue);
      }
    };

    // Handle value display
    const inputValue =
      value !== undefined
        ? String(value)
        : defaultValue !== undefined
        ? String(defaultValue)
        : "";

    // Format display value
    const getDisplayValue = () => {
      if (!inputValue) return "";

      if (mask) {
        // Limit the raw value to max digits before formatting
        const maxDigits = getMaxDigits(mask);
        const limitedValue = extractRawValue(inputValue).substring(
          0,
          maxDigits
        );
        return applyMask(limitedValue, mask);
      } else if (currency) {
        return formatCurrency(inputValue);
      }

      return inputValue;
    };

    const displayValue = getDisplayValue();

    const inputClassName = cn(
      "flex min-h-[42px] h-auto w-full rounded border border-primary/15 bg-white px-3 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-1 focus:border-primary/40 placeholder:font-light font-normal",
      className
    );

    const setRefs = (element: HTMLInputElement | null) => {
      internalRef.current = element;

      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          element;
      }
    };

    return (
      <div className="w-full relative text-primary">
        <input
          type={(currency && !isPassword) || showPassword ? "text" : type}
          className={inputClassName}
          ref={setRefs}
          value={displayValue}
          onChange={handleInputChange}
          disabled={disabled}
          {...props}
        />

        <button
          hidden={!isPassword}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          {showPassword ? (
            <IoEyeOnOutline size={18} />
          ) : (
            <IoEyeOffOutline size={18} />
          )}
        </button>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
