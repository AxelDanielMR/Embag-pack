'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/empaques', label: 'Empaques' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <header className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          {/* Logo: large image on the left */}
          <Link href="/" aria-label="Inicio">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center">
              <Image
                src="/images/embag-pack.png"
                alt="Embag Pack"
                width={144}
                height={144}
                priority
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-300 hover:text-sky-400'
                    : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L14.22 3.793a1 1 0 010-1.414zm2.828 4.22a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm0 5.657a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4.22 3.793a1 1 0 01-1.414 1.414L1.392 3.179a1 1 0 011.414-1.414L4.22 3.793zM3 10a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm0 5.657a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM2.707 9.293a1 1 0 001 1.414l1.414 1.414a1 1 0 001.414-1.414L3.121 9.293a1 1 0 00-1.414 0zm12.586 1.414l1.414-1.414a1 1 0 10-1.414-1.414l-1.414 1.414a1 1 0 101.414 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
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
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 font-medium transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-300 hover:text-sky-400'
                    : 'text-gray-700 hover:text-sky-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
}
