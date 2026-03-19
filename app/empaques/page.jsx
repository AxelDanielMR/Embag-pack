'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function Empaques() {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('todos');

  const categories = [
    'todos',
    'cajas',
    'bolsas',
    'papel',
    'plástico',
    'accesorios',
  ];

  const products = [
    { id: 1, name: 'Cajas Corrugadas', category: 'cajas', description: 'Cajas de cartón corrugado resistentes' },
    { id: 2, name: 'Bolsas Kraft', category: 'bolsas', description: 'Bolsas de papel kraft ecológicas' },
    { id: 3, name: 'Papel Tissue', category: 'papel', description: 'Papel tissue de alta calidad' },
    { id: 4, name: 'Bolsas Plásticas', category: 'plástico', description: 'Bolsas plásticas reutilizables' },
    { id: 5, name: 'Cintas Adhesivas', category: 'accesorios', description: 'Cintas de empaques profesionales' },
    { id: 6, name: 'Espuma de Protección', category: 'accesorios', description: 'Material protector para productos' },
    { id: 7, name: 'Cajas Impresas', category: 'cajas', description: 'Cajas personalizadas con tu logotipo' },
    { id: 8, name: 'Papel Burbuja', category: 'papel', description: 'Papel burbuja para protección' },
  ];

  const filteredProducts =
    filter === 'todos' ? products : products.filter((p) => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero */}
      <section className="container-custom section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="heading-section mb-4 text-sky-600 dark:text-sky-400">
            Catálogo de Empaques
          </h1>
          <p className="subheading mb-8">
            Explora más de 20,000 productos disponibles para tus necesidades
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className={`${isDark ? 'bg-dark-800' : 'bg-gray-50'} py-8`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 capitalize ${
                  filter === cat
                    ? 'bg-sky-600 dark:bg-sky-500 text-white shadow-lg'
                    : isDark
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container-custom section">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ translateY: -8, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-sky-500'
                  : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-sky-500'
              }`}
            >
              {/* Placeholder para imagen */}
              <div className={`w-full h-40 rounded-lg mb-4 ${isDark ? 'bg-slate-700' : 'bg-gray-200'} flex items-center justify-center`}>
                <span className="text-4xl">📦</span>
              </div>
              
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {product.description}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-sky-600 dark:bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-700 dark:hover:bg-sky-400 transition-colors"
              >
                Ver Detalles
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No hay productos en esta categoría
            </p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className={`${isDark ? 'bg-slate-800' : 'bg-gray-50'} section transition-colors duration-300`}>
        <div className="container-custom text-center">
          <h2 className={`heading-section mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>¿No encontraste lo que buscas?</h2>
          <p className="subheading mb-8">
            Contáctanos para solicitar productos personalizados o consultar disponibilidad
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contacto"
            className="inline-block btn-primary-dark"
          >
            Solicitar Cotización
          </motion.a>
        </div>
      </section>
    </main>
  );
}
