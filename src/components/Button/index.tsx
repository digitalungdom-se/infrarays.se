import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className={clsx(
      "transition font-medium rounded-md p-2 px-4 w-full text-lg text-white",
      "focus:outline focus:outline-2 focus:outline-offset-2",
      "hover:bg-brand-800 bg-brand-600 disabled:hover:bg-brand-600 focus:outline-brand-500",
      "disabled:opacity-80",
      className
      // "text-white"
    )}
  ></button>
);

export default Button;
