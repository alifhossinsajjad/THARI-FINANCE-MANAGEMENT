import Image from "next/image";
import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 40,
  height = 40,
  className = "",
}) => {
  return (
    <div className="flex gap-2 justify-center items-center ">
      <div>
        <Image
          src="/images/Logo2.png"
          alt="Company Logo"
          width={width}
          height={height}
          className={className}
          priority
        />
      </div>
      <h1 className="text-primary font-medium text-4xl">THARI</h1>
    </div>
  );
};

export default Logo;
