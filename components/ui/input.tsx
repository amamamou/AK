"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 transition-all",
          "focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10",
          "hover:border-neutral-400",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500 disabled:border-neutral-200",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
