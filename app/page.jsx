'use client';

import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import Link from 'next/link';

export default function Home() {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const stats = [
    { number: '300+', label: 'Clientes Satisfechos', icon: '👥' },
    { number: '20,000+', label: 'Productos Disponibles', icon: '📦' },
    { number: 'Nacional', label: 'Cobertura a Nivel País', icon: '🗺️' },
  ];

  return (
    <main className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
      {/* Hero Section */}
      <section className="container-custom section">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto text-center"
        >
          <motion.h1 variants={itemVariants} className="heading-section mb-6 bg-gradient-to-r from-sky-600 to-sky-400 dark:from-sky-400 dark:to-sky-300 bg-clip-text text-transparent leading-tight">
            Soluciones de Empaques Profesionales
          </motion.h1>

          <motion.p variants={itemVariants} className="subheading mb-8 max-w-2xl mx-auto">
            Más de 300 clientes confían en nosotros para sus necesidades de empaques. Con un catálogo de 20,000+ productos y cobertura nacional.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/empaques">
              <button className="btn-primary-dark w-full sm:w-auto">
                Ver Catálogo
              </button>
            </Link>
            <Link href="/contacto">
              <button className="btn-outline w-full sm:w-auto">
                Contáctanos
              </button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="card text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`${isDark ? 'bg-slate-800' : 'bg-gray-50'} section transition-colors duration-300`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section mb-4">¿Por qué elegir Embag Pack?</h2>
            <p className="subheading">Nos posicionamos como líderes en el mercado de empaques nacionales</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: 'Amplio Catálogo', description: '20,000+ productos disponibles para todas tus necesidades' },
              { title: 'Calidad Garantizada', description: 'Materiales premium con estándares internacionales' },
              { title: 'Entrega Rápida', description: 'Cobertura nacional con logística eficiente' },
              { title: 'Precios Competitivos', description: 'Los mejores precios sin comprometer calidad' },
              { title: 'Soporte Técnico', description: 'Equipo dedicado para resolver tus consultas' },
              { title: 'Soluciones Personalizadas', description: 'Adaptamos nuestros productos a tu empresa' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ translateY: -8 }}
                className="card text-center"
              >
                  <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-sky-600 dark:text-sky-400 text-xl">✓</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-section mb-4">¿Listo para transformar tus empaques?</h2>
          <p className="subheading mb-8">Únete a los cientos de empresas que ya confianza en nosotros</p>
          <Link href="/contacto">
            <button className="btn-primary-dark">
              Solicitar Cotización
            </button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
