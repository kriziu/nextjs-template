import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from '@/app/_lib/utils';

import PageProgressBar from './_components/page-progress-bar';
import { ThemeProvider } from './_components/theme-provider';
import { ThemeToggle } from './_components/theme-toggle';
import { Toaster } from './_components/ui/sonner';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Nextjs Template',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <PageProgressBar />
          <div className="absolute bottom-4 right-4 z-10">
            <ThemeToggle />
          </div>
          {children}
          <Toaster expand richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
