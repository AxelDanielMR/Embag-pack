'use client';

import { useTheme } from '../context/ThemeContext';

export default function SectionBackground({ children, bgGradientLight, bgGradientDark }) {
  const { isDark } = useTheme();
  
  const defaultBgLight = 'linear-gradient(135deg, #0d80ce 0%, #06b6a3 100%)';
  const defaultBgDark = 'linear-gradient(135deg, #1e3a8a 0%, #0d4a3a 100%)';

  return (
    <section
      className="w-full py-20 px-6 lg:py-28"
      style={{
        background: isDark 
          ? (bgGradientDark || defaultBgDark) 
          : (bgGradientLight || defaultBgLight),
      }}
    >
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  );
}
