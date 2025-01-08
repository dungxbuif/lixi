'use client';
import { cn } from '@/lib/utils';
import RootProvider from '@/shared/components/providers/RootProvider';
import HeaderBar from '@/shared/components/templates/HeaderBar';
import Sidebar from '@/shared/components/templates/Sidebar';
import { PagePath } from '@/shared/constant';
import '@/shared/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Karla as FontKarla, Poppins as FontPoppins } from 'next/font/google';
import { usePathname } from 'next/navigation';

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

  const pathname = usePathname();


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
          <RootProvider>
            <div>
              {pathname !== PagePath.LOGIN && <HeaderBar />}
              <div
                className={`bg-background h-screen overflow-hidden ${pathname !== PagePath.LOGIN ? 'flex' : ''}`}
              >
                {pathname !== PagePath.LOGIN && <Sidebar />}
                <main
                  className={`
                ${pathname !== PagePath.LOGIN ? 'flex-1 overflow-x-hidden pt-20 px-8 pb-6' : undefined}
              `}
                >
                  {children}
                </main>
              </div>
            </div>
          </RootProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
