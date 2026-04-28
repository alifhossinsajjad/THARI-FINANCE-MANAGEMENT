"use client";

import Image from "next/image";

export default function AboutBanner({
  text = "About THARI Finance",
}: {
  text?: string;
}) {
  return (
    <section className="relative h-screen md:h-150 w-full flex justify-center text-center">
      {/* Image background */}
      <Image
        src="/images/user/aboutBanner.png"
        alt="about banner"
        width={1600}
        height={1600}
        quality={100}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#020b3a]/80 via-[#0a1a5e]/70 to-[#020b3a]/80" />
      {/* Banner content */}
      <div className="relative z-10 mx-auto space-y-4 flex pt-8 h-full  max-w-360 flex-col items-center justify-center align-item-center px-8 text-center text-white md:items-start md:text-left lg:px-0">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl text-center mx-auto">
          {text}
        </h1>

        <p className="text-md mt-4 max-w-2xl mx-auto  text-center text-gray-200 md:max-w-3xl md:text-lg  lg:text-2xl">
          Empowering ethical investors with transparent, Sharia-compliant
          financial insights
        </p>
      </div>
    </section>
  );
}
