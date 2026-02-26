import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NetworkErrorLogger } from "@/app/components/network-error-logger";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "@handled Design System",
  description: "Design system registry for HandledAI projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NetworkErrorLogger>{children}</NetworkErrorLogger>
      </body>
    </html>
  );
}
