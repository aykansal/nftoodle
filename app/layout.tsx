import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/header';
import { ThirdwebProvider } from 'thirdweb/react';
import { Toaster } from '@/components/ui/sonner';
import { BaseLayout } from '@/components/layout/base-layout';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

const squid = localFont({
  src: './fonts/squid.woff',
  variable: '--font-squid',
  preload: true,
  display: 'swap',
  weight: '100 900',
});

const ibm = localFont({
  src: './fonts/IBMPlexMono-Medium.ttf',
  variable: '--font-ibm-plex-mono',
  preload: true,
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'NFToodle - Squid Game NFT Platform',
  description: 'Create and share NFT memes with Squid Game theme',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibm.variable} ${squid.variable}`}>
      <body className="bg-[#0A0A0A] min-h-screen flex flex-col">
        <ThirdwebProvider>
          <div className="bg-gray-900 min-h-screen h-full w-full">
            <Header />
            <AuthProvider>
              <BaseLayout>
                <main className="flex-grow">{children}</main>
              </BaseLayout>
              <Footer />
            </AuthProvider>
          </div>
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
