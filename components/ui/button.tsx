"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
}

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-900 focus-visible:ring-neutral-900",
  outline: "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:ring-neutral-900",
  ghost: "text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-900",
  secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:ring-neutral-900",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
