"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface CustomButtonProps {
  title: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  width?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export default function CommonButton({
  title,
  bgColor = "bg-[#2563EB]",
  borderColor = "border-blue-600",
  textColor = "text-white",
  width = "w-auto",
  showIcon = false,
  icon,
  onClick,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-2 text-md font-semibold border shadow-sm transition-all duration-200 hover:opacity-70",
        bgColor,
        borderColor,
        textColor,
        width,
      )}
    >
      {showIcon && icon && <span className="h-4 w-4">{icon}</span>}
      {title}
    </button>
  );
}
