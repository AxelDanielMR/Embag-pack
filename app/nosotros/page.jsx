'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

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
      {/* Hero */}
      <section className="container-custom section">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="heading-section mb-6 text-sky-600 dark:text-sky-400">
            Nosotros
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Somos una empresa pionera en soluciones de empaques a nivel nacional, comprometida con la calidad y la innovación.
          </motion.p>
        </motion.div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className={`${isDark ? 'bg-dark-800' : 'bg-gray-50'} section transition-colors duration-300`}>
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Misión',
                content: 'Proveer soluciones de empaques de alta calidad que impulsen el éxito de nuestros clientes, con enfoque en sostenibilidad e innovación.',
                icon: '🎯',
              },
              {
                title: 'Visión',
                content: 'Ser la empresa de empaques más confiable y innovadora de Latino América, reconocida por excelencia y responsabilidad ambiental.',
                icon: '👁️',
              },
              {
                title: 'Valores',
                content: 'Integridad, calidad, innovación, sostenibilidad y compromiso con nuestros clientes y el medio ambiente.',
                icon: '💎',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-sky-600 dark:text-sky-400">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Historia */}
      <section className="container-custom section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-section text-center mb-16"
        >
          Nuestra Trayectoria
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {timeline.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-8 flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-sky-600 dark:bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                {index !== timeline.length - 1 && (
                  <div className="w-1 h-16 bg-sky-300 dark:bg-sky-700 mt-2" />
                )}
              </div>
              <div className="card flex-1">
                <p className="text-sky-600 dark:text-sky-400 font-bold text-lg">{event.year}</p>
                <h3 className="text-xl font-bold mt-2 mb-1">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Placeholder */}
      <section className={`${isDark ? 'bg-dark-800' : 'bg-gray-50'} section transition-colors duration-300`}>
        <div className="container-custom text-center">
          <h2 className="heading-section mb-6">Nuestro Equipo</h2>
          <p className="subheading mb-12">Profesionales dedicados a tu éxito</p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {['Gerente General', 'Gerente Comercial', 'Gerente Técnico', 'Gerente Logística'].map((position, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="card"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-900 dark:to-primary-700 rounded-full mx-auto mb-4"></div>
                <p className="font-semibold">{position}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
