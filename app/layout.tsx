import type { Metadata } from 'next';
import './globals.css';
import { Plus_Jakarta_Sans as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Pulse Health',
  description: 'PulseHealth simplifies healthcare management with real-time patient monitoring, data integration, and personalized care tools for improved outcomes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add "suppressHydrationWarning" to fix warning: Extra attributes from the server: class,style
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-dark-300 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
