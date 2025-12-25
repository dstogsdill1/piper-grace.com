import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShootingStarsBackground } from "@/components/ui/shooting-stars";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piper Grace's Farm",
  description: "A fun place for Piper Grace to play and learn!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="synthwave">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-base-300`}
      >
        <ShootingStarsBackground>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
            {children}
          </main>
          <Footer />
        </ShootingStarsBackground>
      </body>
    </html>
  );
}