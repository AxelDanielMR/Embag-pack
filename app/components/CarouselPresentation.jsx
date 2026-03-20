'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ButtonHover from './ButtonHover';

export default function CarouselPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dragStartX = useRef(null);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const slides = [
    {
      id: 1,
      title: t('carousel.slide1.title'),
      description: t('carousel.slide1.description'),
      image: '/images/image_01.jpg',
    },
    {
      id: 2,
      title: t('carousel.slide2.title'),
      description: t('carousel.slide2.description'),
      image: '/images/image_02.jpg',
    },
    {
      id: 3,
      title: t('carousel.slide3.title'),
      description: t('carousel.slide3.description'),
      image: '/images/image_03.jpg',
    },
  ];

  const isImage01 = currentSlide === 0;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const resetSwipe = () => {
    dragStartX.current = null;
  };

  const handlePointerDown = (event) => {
    const interactiveTarget = event.target.closest('button, a, [role="button"]');
    if (interactiveTarget) {
      resetSwipe();
      return;
    }

    dragStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (dragStartX.current === null) return;

    const swipeDistance = event.clientX - dragStartX.current;
    const swipeThreshold = 60;

    if (Math.abs(swipeDistance) >= swipeThreshold) {
      if (swipeDistance < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    resetSwipe();
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full" style={{ backgroundColor: isDark ? '#0f1419' : '#f0f6fb' }}>
      <section
        className="relative w-full min-h-[110vh] lg:min-h-[120vh] flex items-center justify-between overflow-hidden -mt-96 pt-80 select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetSwipe}
        onPointerLeave={resetSwipe}
        style={{
          touchAction: 'pan-y',
          background: isDark
            ? 'linear-gradient(135deg, #0f1419 0%, #1a2a3a 90%, #2d3e4e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #73c8e5 90%, #31A9E0 100%)',
        }}
      >
      {/* Noise overlay effect */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px),
            radial-gradient(circle at 60% 70%, rgba(0,0,0,0.5) 1px, transparent 1px),
            radial-gradient(circle at 80% 10%, rgba(255,255,255,0.6) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(0,0,0,0.4) 1px, transparent 1px),
            radial-gradient(circle at 90% 60%, rgba(255,255,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-40 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side - Text content */}
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full lg:w-1/2 max-w-lg z-10"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={elementVariants}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                isDark ? 'text-white' : 'text-[#084a77]'
              }`}>
                {slides[currentSlide].title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={elementVariants}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <p className={`text-lg mb-8 leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-[#084a77]'
              }`}>
                {slides[currentSlide].description}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={elementVariants}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ButtonHover href="#">{t('carousel.navigation.learnMore')}</ButtonHover>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile image rectangle under text */}
        <motion.div
          className="w-full mt-6 lg:hidden"
          initial="hidden"
          animate="visible"
          variants={elementVariants}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: isImage01 ? '20% center' : 'center',
              }}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Full-right image area (covers the right side of the section) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-image-${currentSlide}`}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: 'spring', stiffness: 220, damping: 30 }}
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 lg:w-1/2 z-0 overflow-hidden"
          style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: isImage01 ? '20% center' : 'center',
              }}
              priority
              className="transition-transform duration-500"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          onClick={prevSlide}
          className={`p-3 rounded-full transition-all shadow-lg ring-1 ${
            isDark
              ? 'bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white ring-gray-600/30'
              : 'bg-white bg-opacity-60 hover:bg-opacity-80 text-[#084a77] ring-white/30'
          }`}
          aria-label="Anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full cursor-pointer ${
                isDark
                  ? currentSlide === index
                    ? 'bg-white'
                    : 'bg-gray-400 bg-opacity-50'
                  : currentSlide === index
                  ? 'bg-white'
                  : 'bg-white bg-opacity-40'
              }`}
              animate={{
                width: currentSlide === index ? 32 : 8,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextSlide}
          className={`p-3 rounded-full transition-all shadow-lg ring-1 ${
            isDark
              ? 'bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white ring-gray-600/30'
              : 'bg-white bg-opacity-60 hover:bg-opacity-80 text-[#084a77] ring-white/30'
          }`}
          aria-label="Siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
      </section>
    </div>
  );
}
