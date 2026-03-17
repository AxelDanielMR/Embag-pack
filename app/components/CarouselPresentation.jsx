'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ButtonHover from './ButtonHover';

const slides = [
  {
    id: 1,
    title: 'Procesos certificados para tu seguridad',
    description: 'Con nuestra experiencia y dedicación, garantizamos que sus productos estén bien protegidos y cumplan con los estándares más altos.',
    image: '/images/image_01.jpg',
  },
  {
    id: 2,
    title: 'Garantizando inocuidad en tus empaques',
    description: 'Garantizando Inocuidad con Nuestros Servicios de Empaque: Tenemos el Compromiso con la Calidad y la Seguridad en Cada Producto.',
    image: '/images/image_02.jpg',
  },
  {
    id: 3,
    title: 'Entrega rápida y confiable',
    description: 'Con nuestra red logística nacional, garantizamos que tus empaques lleguen a tiempo y en perfecto estado.',
    image: '/images/image_03.jpg',
  },
];

export default function CarouselPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDark } = useTheme();
  const isImage01 = slides[currentSlide].image === '/images/image_01.jpg';

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
    <div className="w-full" style={{ backgroundColor: isDark ? '#0f1419' : '#0c87c9' }}>
      <section
        className="relative w-full min-h-[110vh] lg:min-h-[120vh] flex items-center justify-between overflow-hidden -mt-96 pt-80"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #0f1419 0%, #1a2a3a 50%, #2d3e4e 100%)'
            : 'linear-gradient(135deg, #0c87c9 0%, #0da5e8 50%, #ffffff 100%)',
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
        {/* Left Arrow */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          onClick={prevSlide}
          className={`absolute -left-20 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full transition-all shadow-lg ring-1 ${
            isDark
              ? 'bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white ring-gray-600/30'
              : 'bg-white bg-opacity-60 hover:bg-opacity-80 text-[#084a77] ring-white/30'
          }`}
          aria-label="Anterior"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextSlide}
          className={`absolute -right-20 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full transition-all shadow-lg ring-1 ${
            isDark
              ? 'bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white ring-gray-600/30'
              : 'bg-white bg-opacity-60 hover:bg-opacity-80 text-[#084a77] ring-white/30'
          }`}
          aria-label="Siguiente"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

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
                isDark ? 'text-white' : 'text-white'
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
                isDark ? 'text-gray-200' : 'text-blue-50'
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
              <ButtonHover href="#">Saber más</ButtonHover>
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
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
      </section>
    </div>
  );
}
