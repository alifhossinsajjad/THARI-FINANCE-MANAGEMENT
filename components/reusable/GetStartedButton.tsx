"use client";

import React from "react";
import Image from "next/image";

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
  bgClass = "bg-blue-600 hover:bg-blue-700",
  borderClass = "border-transparent", // default border
  showArrow = true,
}) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-full border px-7 py-2 font-medium text-white transition-colors ${bgClass} ${borderClass} ${className}`}
    >
      {text}
      {showArrow && (
        <Image
          width={36}
          height={36}
          className="h-9 w-9"
          src="/images/landingPage/arrowButton.png"
          alt="arrow"
        />
      )}
    </a>
  );
};

export default GetStartedButton;
