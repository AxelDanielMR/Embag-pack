'use client';

import { useTheme } from '../context/ThemeContext';

export default function SectionBackground({ children, bgGradientLight, bgGradientDark }) {
  const { isDark } = useTheme();
  
  const defaultBgLight = 'linear-gradient(135deg, #31A9E0 0%, #73c8e5 10%, #ffffff 100%)';
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
