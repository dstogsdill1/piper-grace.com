import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ModernNavbar from "@/components/ModernNavbar";
import ModernFooter from "@/components/ModernFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piper's Ranch | Your Adventure Awaits",
  description: "A place for Piper Grace to explore, create, and grow!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="piper-ranch">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-base-100`}
      >
        <ModernNavbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <ModernFooter />
      </body>
    </html>
  );
}