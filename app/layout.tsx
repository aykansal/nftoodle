import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import AuthProvider from "@/components/AuthProvider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const squid = localFont({
  src: "./fonts/squid.woff",
  variable: "--font-squid",
  weight: "100 900",
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
      <body
        className={`${squid.variable} antialiased`}
      >
        <ThirdwebProvider>
          <Header />
          <AuthProvider>{children}</AuthProvider>
          <Toaster/>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
