'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';

export default function PackageCarousel({ currentIndex, setCurrentIndex }) {
  const { isDark } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  const packages = [
    {
      id: 'agro',
      image: '/images/image_06.jpg',
      title: 'Empaques Agroindustria',
      description: 'La agroindustria requiere soluciones de empaque especializadas que abarcan desde la producción de alimentos hasta el procesamiento, almacenamiento y distribución. En Embag Pack entendemos estas necesidades con 15 años de experiencia. Garantizamos protección superior, trazabilidad completa, versatilidad en diseños y certificación de calidad.',
    },
    {
      id: 'alimentos',
      image: '/images/image_07.jpg',
      title: 'Alimentos',
      description: 'Nos hemos consolidado como expertos en empaques de grado alimenticio, respaldados por certificaciones Kosher y SQF. La seguridad e inocuidad de los alimentos es primordial, por eso cada producto está diseñado bajo estrictos controles de calidad. Ofrecemos inocuidad garantizada y trazabilidad completa.',
    },
    {
      id: 'automotriz',
      image: '/images/image_08.jpg',
      title: 'Automotriz',
      description: 'Desarrollamos empaques especializados que cumplen con exigentes especificaciones del sector automotriz. Nuestras soluciones protegen componentes críticos y mantienen la integridad durante la cadena de suministro. Ofrecemos protección superior contra daños y control de estática.',
    },
    {
      id: 'industrial',
      image: '/images/image_09.jpg',
      title: 'Empaques Industriales',
      description: 'Ofrecemos soluciones versátiles y especializadas para las necesidades específicas de cada sector industrial. Con 15 años de experiencia y certificaciones internacionales, garantizamos protección, eficiencia y calidad en todos nuestros empaques.',
    },
  ];

  // Auto-scroll effect
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % packages.length);
    }, 4000); // Slow movement every 4 seconds

    return () => clearInterval(interval);
  }, [isHovering, packages.length, setCurrentIndex]);

  // Removed wheel-based navigation for better UX (handled via buttons/clicks only)

  const cardVariants = {
    enter: (direction) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Left - Vertical Carousel */}
      <div className="w-full lg:w-5/12 flex flex-col gap-4">
        <div className="space-y-3">
          {packages.map((pkg, index) => (
            <motion.button
              key={pkg.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-full text-left transition-all duration-300 rounded-xl overflow-hidden group ${
                index === currentIndex
                  ? 'ring-2 ring-white/50'
                  : 'opacity-50 hover:opacity-75'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-20 lg:h-24 overflow-hidden rounded-xl">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    index === currentIndex ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <span className="text-white font-semibold text-sm lg:text-base px-3 line-clamp-2">
                    {pkg.title}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

       
      </div>

      {/* Right - Info Card */}
      <div className="hidden lg:flex w-7/12 flex-col gap-4 sticky top-0 h-fit">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-10"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {packages[currentIndex].title}
            </h3>
            <p className="text-white/90 leading-relaxed text-sm lg:text-base">
              {packages[currentIndex].description}
            </p>

            {/* Visual indicator */}
            <div className="mt-8 flex gap-2">
              {packages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/40'
                  }`}
                  layoutId="indicator"
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Info Card */}
      <div className="lg:hidden w-full mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5"
          >
            <h3 className="text-xl font-bold text-white mb-3">
              {packages[currentIndex].title}
            </h3>
            <p className="text-white/90 leading-relaxed text-sm">
              {packages[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
