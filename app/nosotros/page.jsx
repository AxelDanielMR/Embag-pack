'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import AboutSection from '../components/AboutSection';
import MisionVisionSection from '../components/MisionVisionSection';
import ValoresSection from '../components/ValoresSection';
import TimelineSection from '../components/TimelineSection';
import OurTEam from '../components/OurTEam';

export default function Nosotros() {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const timeline = [
    { year: '2010', title: 'Fundación', description: 'Comenzamos como una startup con visión innovadora' },
    { year: '2015', title: 'Expansión Nacional', description: 'Alcanzamos cobertura en todo el país' },
    { year: '2018', title: '300+ Clientes', description: 'Celebramos la confianza de nuestros clientes' },
    { year: '2024', title: 'Líderes del Mercado', description: 'Posicionados como empresa número 1 en empaques' },
  ];

  return (
    <main className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <AboutSection />
      <MisionVisionSection />
      <ValoresSection />
      <TimelineSection />
      <OurTEam />
    </main>
  );
}
