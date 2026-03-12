'use client';

import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';

export function RootLayoutClient({ children }) {
  return (
    <ThemeProvider>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
