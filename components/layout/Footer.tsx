"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Left Section - Logo and Description */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold">Thari Finance</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Sharia-compliant investment insights for ethical wealth growth.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-colors duration-200 hover:bg-gray-700"
              >
                <Facebook className="h-4 w-4 text-black" />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:bg-gray-700"
              >
                <Twitter className="h-4 w-4 text-black" />
              </Link>

              <Link
                href="https://instagram.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:bg-gray-700"
              >
                <Instagram className="h-4 w-4 text-black" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="text-sm font-semibold mb-4">For Professionals</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/become-a-partner"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-professionals"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Terms for Professionals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal-notices"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Legal Notices
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 bg-[#1C1C1C]">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            © 2025 THARI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
