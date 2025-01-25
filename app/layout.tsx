import type { Metadata } from "next";
// import {IBM_Plex_Mono} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import AuthProvider from "@/components/AuthProvider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const squid = localFont({
  src: "./fonts/squid.woff",
  variable: "--font-squid",
  weight: "100 900",
});

const ibm = localFont({
  src: "./fonts/IBMPlexMono-Medium.ttf",
  weight: "100 900",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "NFToodle",
  description: "Meme your NFTs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${squid.variable} ${ibm.variable} antialiased`}>
        <ThirdwebProvider>
          <div className="bg-gray-900 min-h-screen h-full w-full">
            <Header />
            <AuthProvider>
              <div className="min-h-[66vh]">{children}</div>
              <Footer />
            </AuthProvider>
          </div>
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
