import { RootLayoutClient } from './RootLayoutClient';
import '../styles/globals.css';

export const metadata = {
  title: 'Embag Pack - Empaques Nacionales',
  description: 'Líder en soluciones de empaques con más de 300 clientes y 20,000 productos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
