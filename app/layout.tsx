import { Toaster } from "sonner";

import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import ReduxProviderWrapper from "@/Redux/reduxProvider/ReduxProviderWrapper";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THARI",
  description:
    "Sharia-compliant stock, crypto, and commodity insights to help you grow your wealth with confidence.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        {/*  Wrap your whole app with Redux Provider */}
        <ReduxProviderWrapper>
          {children}
          <Toaster richColors position="top-right" />
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
