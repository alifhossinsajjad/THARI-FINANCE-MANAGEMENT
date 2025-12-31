import * as React from "react";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
  | "primary"
  | "secondary"
  | "ghost"
  | "offer"
  | "rounded"
  | "outline"
  | "accept"
  | "destructive"
  | "icon";
  size?: "sm" | "md" | "lg" | 'icon';
};


const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "cursor-pointer bg-foreground text-background hover:opacity-90",
  secondary: "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20",
  ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
  offer: "bg-[#2d6ef0] hover:bg-[#245cc1] text-white",
  rounded: "bg-blue-600 text-white hover:bg-blue-700 rounded-2xl",
  outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
  accept: "bg-[#2d6ef0] hover:bg-[#245cc1] text-white rounded-xl ",
  destructive: "bg-[#2d6ef0] hover:bg-[#245cc1] text-white rounded-xl ",
  icon: "bg-gray-400 hover:bg-blue-900 rounded-full dark:hover:bg-white/10",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "cursor-pointer h-9 px-3 text-sm",
  md: "cursor-pointer h-10 px-4 text-sm",
  lg: "cursor-pointer h-11 px-6 text-base",
  icon: "h-6 w-6 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  ),
);
Button.displayName = "Button";
