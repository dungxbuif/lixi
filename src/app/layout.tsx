import { cn } from '@/lib/utils';
import RootProvider from '@/shared/components/providers/RootProvider';
import '@/shared/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Karla as FontKarla, Poppins as FontPoppins } from 'next/font/google';

const fontKarla = FontKarla({
  subsets: ['latin'],
  variable: '--font-karla',
  weight: '400'
});

const fontPoppins = FontPoppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '400'
});

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session
}>) {
  return (
    <html lang='en' suppressHydrationWarning style={{ overflow: 'hidden' }}>
      <body
        className={cn(
          'min-h-screen bg-background font-poppins antialiased',
          fontPoppins.variable,
          fontKarla.variable
        )}
      >
        <SessionProvider session={session}>
          <RootProvider>{children}</RootProvider>
        </SessionProvider>
        
      </body>
    </html>
  );
}
