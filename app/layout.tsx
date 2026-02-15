import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProviderWrapper from "@/Redux/reduxProvider/ReduxProviderWrapper";

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
    // <html lang="en">
    //   <body className={inter.className}>{children}</body>
    // </html>

    <html lang="en">
      <body className={inter.className}>
        {/*  Wrap your whole app with Redux Provider */}
        <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
      </body>
    </html>
  );
}
