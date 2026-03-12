'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

export default function Footer() {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navegación',
      links: [
        { label: 'Inicio', href: '/' },
        { label: 'Nosotros', href: '/nosotros' },
        { label: 'Empaques', href: '/empaques' },
        { label: 'Contacto', href: '/contacto' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '/nosotros' },
        { label: 'Blog', href: '#' },
        { label: 'Carreras', href: '#' },
        { label: 'Prensa', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', href: '#' },
        { label: 'Términos', href: '#' },
        { label: 'Cookies', href: '#' },
        { label: 'Contacto', href: '/contacto' },
      ],
    },
  ];

  return (
    <footer className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-t transition-colors duration-300`}>
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`text-2xl font-bold mb-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}
              >
                Embag<span className={isDark ? 'text-primary-300' : 'text-primary-500'}>Pack</span>
              </motion.div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Somos líderes en soluciones de empaques a nivel nacional, con más de 300 clientes satisfechos.
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
            <Link href={link.href}>
                      <motion.span
                        whileHover={{ color: '#0ea5e9' }}
                        className="text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className={`h-px ${isDark ? 'bg-slate-700' : 'bg-gray-200'} mb-8`} />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
        >
          <p>© {currentYear} Embag Pack. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1, color: '#0ea5e9' }}
                className="hover:text-primary-500 transition-colors"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
