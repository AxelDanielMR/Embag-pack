'use client';

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import PackageCarousel from './PackageCarousel';

export default function OurPackages() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const packages = [
    { id: 'agro', image: '/images/image_06.jpg' },
    { id: 'alimentos', image: '/images/image_07.jpg' },
    { id: 'automotriz', image: '/images/image_08.jpg' },
    { id: 'industrial', image: '/images/image_09.jpg' },
  ];

  return (
    <div className="w-full transition-colors duration-300" style={{ backgroundColor: isDark ? '#051e30' : '#084a77' }}>
      <section className="relative w-full py-28 lg:py-36 overflow-hidden">
        {/* Base gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #084a77 0%, #0d80ce 100%)',
            borderBottomRightRadius: '6rem',
          }}
        />

      {/* Animated background image - right side only */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${packages[currentIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          borderBottomRightRadius: '6rem',
          mask: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
          WebkitMask: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide">{t('ourPackages.title')}</h3>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed">
              {t('ourPackages.description')}
            </p>
          </div>
          <PackageCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </div>
      </div>
      </section>
    </div>
  );
}
