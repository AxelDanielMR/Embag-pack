'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [logoHidden, setLogoHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setLogoHidden(y > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/empaques', label: 'Empaques' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <div className={`sticky top-0 z-50`}>{/* removed top margin to remove whitespace under logo */}
      {/* Header Container */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`flex justify-between items-end gap-2 w-full px-4`}>
        {/* Logo - Left side, outside the rounded header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={logoHidden ? { opacity: 0, y: -20, scale: 0.95 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pt-4"
        >
          <Link href="/" aria-label="Inicio">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center flex-shrink-0 ml-3">
              <Image
                src="/images/embag-pack.png"
                alt="Embag Pack"
                width={120}
                height={120}
                priority
                style={{ objectFit: 'contain' }}
                className="h-20 w-auto"
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Rounded Header Bar - Right side */}
        <motion.header
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className={`inline-flex items-center ml-auto mr-6 -translate-y-1 rounded-full transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-slate-700 to-slate-600' 
              : 'bg-gradient-to-r from-blue-500 to-blue-400'
          } shadow-lg`}>
          <nav className="px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button (visible on small screens) */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className={`w-6 h-6 ${isDark ? 'text-gray-100' : 'text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 ${
                      isDark
                        ? 'text-gray-100 hover:bg-slate-600 hover:text-white'
                        : 'text-white hover:bg-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Theme Toggle grouped with nav */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-3 rounded-full transition-colors duration-200 ${
                  isDark
                    ? 'bg-slate-600 text-yellow-300 hover:bg-slate-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M4.93 19.07l1.41-1.41" />
                    <path d="M17.66 6.34l1.41-1.41" />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden mt-3 pt-3 border-t ${isDark ? 'border-slate-600' : 'border-blue-400'}`}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-2 px-3 font-medium transition-colors duration-200 rounded-md mb-1 ${
                      isDark
                        ? 'text-gray-100 hover:bg-slate-600'
                        : 'text-white hover:bg-blue-600'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </nav>
        </motion.header>
      </motion.div>
    </div>
  );
}
