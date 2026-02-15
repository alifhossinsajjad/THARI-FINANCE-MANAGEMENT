"use client";

import React from "react";
import { MoveUpRight } from "lucide-react";

interface GetStartedButtonProps {
  text?: string;
  href?: string;
  className?: string;
  bgClass?: string; // optional custom background
  borderClass?: string; // optional custom border color
  showArrow?: boolean; // whether to show the arrow
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({
  text = "Get Started",
  href = "#",
  className = "",
  bgClass = "text-white bg-blue-600 hover:bg-blue-700",
  borderClass = "border-transparent",
  showArrow = true,
}) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-full border px-7 py-2 font-medium  transition-colors ${bgClass} ${borderClass} ${className}`}
    >
      {text}
      {showArrow && (
        <div className="bg-primary text-white p-2 rounded-full">
          <MoveUpRight className="h-6 w-6" />
        </div>
      )}
    </a>
  );
};

export default GetStartedButton;
