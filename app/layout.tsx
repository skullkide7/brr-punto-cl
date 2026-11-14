import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import SiteChrome from '@/components/SiteChrome';
import CartDrawer from '@/components/CartDrawer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'BRR — Detalles que lo hacen ronronear',
  description:
    'Arena sanitaria natural a base de tofu, cassava y bentonita premium para gatos. Formula de alto rendimiento, amigable con tu gato y con el planeta.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} font-body`}>
        <SessionProviderWrapper>
          <CartProvider>
            <SiteChrome>{children}</SiteChrome>
            <CartDrawer />
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
