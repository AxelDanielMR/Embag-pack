'use client';

import { useTheme } from '../context/ThemeContext';

export default function FeatureCardContainer({ children }) {
  const { isDark } = useTheme();
  return (
    <section
      className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:py-28 transition-colors duration-300"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0a3b5e 0%, #043d35 100%)'
          : 'linear-gradient(135deg, #0d80ce 0%, #06b6a3 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}
