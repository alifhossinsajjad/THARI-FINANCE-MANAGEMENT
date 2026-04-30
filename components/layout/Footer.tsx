"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

interface CompanyProps {
  width?: number;
  height?: number;
  className?: string;
}

const Footer: React.FC<CompanyProps> = ({
  width = 40,
  height = 40,
  className = "text-white",
}) => {
  return (
    <footer className="bg-primary  text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-360 px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Section - Logo and Description - Takes 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            {/* Logo with THARI text */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/FooterLogo.png"
                  alt="THARI Logo"
                  width={width}
                  height={height}
                  className={className}
                  priority
                />
                <h1 className="font-semibold text-2xl tracking-tight">THARI</h1>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              It is a community where individuals can invest, gain a deeper
              understanding of wealth management, and access Sharia-compliant
              filters for stocks.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 transition-colors duration-200 hover:bg-gray-700"
              >
                {/* <Facebook className="h-4 w-4 text-black" /> */}
                <Image
                  src="/images/user/footer-icon/linkedin-2.png"
                  alt="THARI Logo"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:bg-gray-700"
              >
                <Image
                  src="/images/user/footer-icon/facebook.png"
                  alt="THARI Logo"
                  width={20}
                  height={20}
                />
              </Link>

              <Link
                href="https://instagram.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:bg-gray-700"
              >
                <Image
                  src="/images/user/footer-icon/instagram.png"
                  alt="THARI Logo"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          {/* Empty column for spacing */}
          <div className="lg:col-span-1"></div>

          {/* Contact Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold tracking-wide text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">thari@halarain.com</li>
            </ul>
          </div>

          {/* Empty column for spacing */}
          <div className="lg:col-span-1"></div>

          {/* Legal Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold tracking-wide text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section - Simple and clean */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            © 2025 THARI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
