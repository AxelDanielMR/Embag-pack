'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function Contacto() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar el formulario
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

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

  const contactInfo = [
    {
      icon: '📍',
      title: 'Dirección',
      content: 'Calle Principal 123, Centro Comercial',
    },
    {
      icon: '📞',
      title: 'Teléfono',
      content: '+57 1 234 5678',
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'info@embagpack.com',
    },
    {
      icon: '🕐',
      title: 'Horario',
      content: 'Lun - Vie: 8:00 AM - 6:00 PM',
    },
  ];

  return (
    <main className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero */}
      <section className="container-custom section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="heading-section mb-4 text-sky-600 dark:text-sky-400">
            Contacto
          </h1>
          <p className="subheading">
            ¿Tienes preguntas? Nos encantaría escucharte. Contacta con nuestro equipo.
          </p>
        </motion.div>
      </section>

      <div className="container-custom section">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8">Información de Contacto</h2>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ translateX: 8 }}
                  className="flex gap-4"
                >
                  <div className="text-4xl flex-shrink-0">{info.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links Placeholder */}
            <motion.div variants={itemVariants} className="mt-12">
              <h3 className="font-bold text-lg mb-4">Síguenos</h3>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-colors ${
                      isDark
                        ? 'bg-slate-800 hover:bg-sky-500'
                        : 'bg-gray-100 hover:bg-sky-600'
                    }`}
                  >
                    {['f', 'ig', 'in', '𝕏'][index]}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className={`card p-8`}>
              <h2 className="text-3xl font-bold mb-6">Envíanos un Mensaje</h2>
              
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg"
                >
                  ✓ Mensaje enviado correctamente. Nos pondremos en contacto pronto.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Tu nombre"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDark
                        ? 'bg-dark-800 border-dark-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="tu@email.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDark
                        ? 'bg-dark-800 border-dark-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="+57 1 234 5678"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Empresa (Opcional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDark
                        ? 'bg-dark-800 border-dark-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Tu empresa"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isDark
                        ? 'bg-dark-800 border-dark-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Cuéntanos sobre tu necesidad..."
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full btn-primary-dark"
                >
                  Enviar Mensaje
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Map Placeholder */}
      <section className={`${isDark ? 'bg-slate-800' : 'bg-gray-50'} py-16`}>
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Ubicación</h2>
          <div className={`w-full h-80 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-200'} flex items-center justify-center`}>
            <p className="text-gray-500 dark:text-gray-400">Google Maps - Por integrar</p>
          </div>
        </div>
      </section>
    </main>
  );
}
