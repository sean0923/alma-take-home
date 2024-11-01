import { AuthProvider } from '@/provider/auth-provider';
import { MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

export const metadata: Metadata = {
  title: 'Alma',
  description: 'Sean Hong Alma Take Home',
};

// got this font from alma website https://www.tryalma.ai/
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <MantineProvider>
            <Toaster />
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
