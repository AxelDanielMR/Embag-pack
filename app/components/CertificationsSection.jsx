"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// ─── Data ────────────────────────────────────────────────────────────────────
// Replace logo paths and descriptions with your actual content

const getCertifications = (t) => [
  {
    id: "sqf",
    name: t('certifications.sqf.title'),
    description: t('certifications.sqf.description'),
    website: "https://www.sqfi.com",
    logo: "/images/certifications/sqf.png",
  },
  {
    id: "kosher",
    name: t('certifications.kosher.title'),
    description: t('certifications.kosher.description'),
    website: "https://www.ok.org",
    logo: "/images/certifications/kosher.png",
  },
  {
    id: "laqi",
    name: t('certifications.laqi.title'),
    description: t('certifications.laqi.description'),
    website: "https://www.laqi.org",
    logo: "/images/certifications/laqui.png",
  },
  {
    id: "anipac",
    name: t('certifications.anipac.title'),
    description: t('certifications.anipac.description'),
    website: "https://www.anippac.org.mx",
    logo: "/images/certifications/anipac.png",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function CertCard({
  cert,
  index,
  isDark,
  t,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(12,135,201,0.08)] hover:shadow-[0_8px_40px_rgba(12,135,201,0.22)] border transition-all duration-300 ${
        isDark 
          ? 'bg-slate-800 border-slate-700 hover:border-[#0c87c9]/50' 
          : 'bg-white border-slate-100 hover:border-[#0c87c9]/30'
      }`}
    >
      {/* Top accent bar */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: "linear-gradient(90deg,#0c87c9,#38b6e8)" }}
      />

      {/* Logo area */}
      <div className={`flex items-center justify-center h-44 px-8 pt-6 pb-4 ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
        <div className="relative w-full h-full">
          <Image
            src={cert.logo}
            alt={`Logo ${cert.name}`}
            fill
            className="object-contain drop-shadow-sm"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 py-5 gap-3">
        <h3
          className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {cert.name}
        </h3>
        <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
          {cert.description}
        </p>

        {/* Link */}
        <Link
          href={cert.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-1 text-sm font-medium
                     transition-colors duration-200"
          style={{ color: "#0c87c9" }}
        >
          <span>{t('certificationsSection.visitSite')}</span>
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink size={14} />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CertificationsSection() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const certifications = getCertifications(t);
  return (
    <section className={`w-full py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <h2
            className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t('certificationsSection.title')}
          </h2>
          <p className={`max-w-xl text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('certificationsSection.description')}
          </p>
          {/* Decorative underline */}
          <motion.div
            className="mt-5 h-[3px] w-16 rounded-full"
            style={{ background: "#0c87c9" }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} isDark={isDark} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
