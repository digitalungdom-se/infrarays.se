import React from "react";
import Input, { InputProps } from "components/Input";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export interface FormInputProps extends InputProps {
  error?: boolean;
  label?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      <Input
        {...props}
        appendIcon={error && <ExclamationCircleIcon />}
        className={clsx(
          error && "text-red-800 border-red-400 focus:border-red-400",
          className
        )}
        ref={ref}
        labelClassName={clsx(error && "text-red-600 focus-within:text-red-600")}
      />
      {label && (
        <label className={clsx(error && "text-red-600")}>{label}</label>
      )}
    </div>
  )
);

FormInput.displayName = "FormInput";

export default FormInput;
