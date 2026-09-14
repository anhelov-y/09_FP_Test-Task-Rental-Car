import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Car Rental',
  description: 'Find your perfect rental car',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${manrope.className}`} suppressHydrationWarning>
        <TanStackProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: '1', paddingBottom: '60px' }}>
              {children}
            </main>
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}