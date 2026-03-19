'use client';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

export function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const hideHeaderFor = pathname?.startsWith('/contacto');

  return (
    <LanguageProvider>
      <ThemeProvider>
        {!hideHeaderFor && <Header />}
        {children}
        <Footer />
      </ThemeProvider>
    </LanguageProvider>
  );
}
