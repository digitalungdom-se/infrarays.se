import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prependIcon?: React.ReactElement | false;
  appendIcon?: React.ReactElement | false;
  color?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prependIcon, appendIcon, labelClassName, ...rest }, ref) => {
    const inputClassName = clsx(
      "border-2 border-gray-300 rounded-md block text-slate-600 placeholder:text-slate-500 drop-shadow-sm",
      prependIcon && "pl-10",
      "focus:ring-0",
      "focus:border-blue-500",
      "disabled:bg-gray-100",
      className
    );

    return (
      <label
        className={clsx(
          "relative text-slate-400 focus-within:text-slate-600 block",
          labelClassName
        )}
      >
        {prependIcon &&
          React.cloneElement(prependIcon, {
            className: clsx(
              prependIcon.props.className,
              "h-5 w-5 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3 z-10"
            ),
          })}
        <input {...rest} ref={ref} className={inputClassName} />
        {appendIcon &&
          React.cloneElement(appendIcon, {
            className: clsx(
              appendIcon.props.className,
              "h-5 w-5 pointer-events-none absolute top-1/2 transform -translate-y-1/2 right-3 z-10"
            ),
          })}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
