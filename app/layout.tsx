import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NetworkErrorLogger } from "@/components/network-error-logger";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NetworkErrorLogger>{children}</NetworkErrorLogger>
      </body>
    </html>
  );
}
