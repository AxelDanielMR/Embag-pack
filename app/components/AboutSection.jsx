'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ─── Data ─────────────────────────────────────────────────────
const STATS = [
  { num: '11', sup: '+', label: 'Años de experiencia' },
  { num: '100', sup: '%', label: 'Calidad certificada' },
  { num: 'MX', sup: '', label: 'Presencia nacional' },
];

const VALUES = [
  {
    title: 'Inocuidad y Calidad',
    desc: 'Certificaciones rigurosas que garantizan la seguridad e integridad de cada empaque que fabricamos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Innovación Constante',
    desc: 'Soluciones de empaque a la vanguardia, adaptadas a las necesidades reales de cada industria.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Equipo Comprometido',
    desc: 'Personas dedicadas que respaldan cada proyecto con experiencia, precisión y vocación de servicio.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

// ─── Value Card ───────────────────────────────────────────────
function ValueCard({ value, index, isDark, cardBg, cardBorder, cardHover }) {
  return (
    <motion.div
      className="group relative px-10 py-9 last:border-r-0 cursor-default transition-colors duration-300"
      style={{ background: cardBg, borderRight: `1px solid ${cardBorder}` }}
      onMouseEnter={(e) => { e.currentTarget.style.background = cardHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = cardBg; }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
    >
      {/* Top accent line */}
      <motion.span
        className="absolute top-0 left-10 right-10 h-0.5 bg-[#00d4ff] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-md flex items-center justify-center mb-4 transition-colors duration-300"
        style={{ background: isDark ? 'rgba(56,189,248,0.1)' : 'rgba(8,74,119,0.07)', color: isDark ? '#38bdf8' : '#084a77' }}
      >
        {value.icon}
      </div>

      <h3
        className="text-sm font-bold tracking-[0.01em] mb-2 transition-colors duration-300"
        style={{ fontFamily: 'Syne, sans-serif', color: isDark ? '#38bdf8' : '#084a77' }}
      >
        {value.title}
      </h3>

      <p className="text-[13px] font-light leading-[1.7] transition-colors duration-300" style={{ color: isDark ? 'rgba(186,220,244,0.65)' : '#666' }}>
        {value.desc}
      </p>
    </motion.div>
  );
}

// ─── About Section ────────────────────────────────────────────
export default function AboutSection() {
  const { isDark } = useTheme();
  
  const bgColor = isDark ? '#0a1620' : '#f5f2ed';
  const leftBg = isDark ? '#051424' : '#084a77';
  const textLight = isDark ? 'rgba(210,235,252,0.85)' : '#555';
  const textDark = isDark ? 'rgba(186,220,244,0.5)' : '#666';
  const cardBg = isDark ? '#0f1f2f' : '#ffffff';
  const cardBorder = isDark ? 'rgba(56,189,248,0.15)' : 'rgba(8,74,119,0.08)';
  const cardHover = isDark ? '#1a2d3f' : '#f0f6fb';

  return (
    <article className={`relative overflow-hidden -mt-40 md:-mt-56 transition-colors duration-300`} style={{ background: bgColor }}>
      {/* Watermark "11" */}
      <span
        className="pointer-events-none select-none absolute -top-5 -right-5 leading-none z-0"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '280px',
          color: 'rgba(8,74,119,0.04)',
          letterSpacing: '-0.05em',
        }}
        aria-hidden
      >
        11
      </span>

      {/* ── Top split grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[640px] md:min-h-[720px]">

        {/* Left — dark panel */}
        <motion.div
          className="relative flex flex-col justify-between px-14 pt-16 pb-14 overflow-hidden transition-colors duration-300"
          style={{ background: leftBg }}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Noise */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Diagonal cut */}
          <div
            className="absolute top-0 -right-px bottom-0 w-14 pointer-events-none hidden md:block transition-colors duration-300"
            style={{
              background: bgColor,
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 relative z-10">
            <span className="w-7 h-px bg-[#00d4ff]" />
            <span
              className="text-[10px] tracking-[0.22em] uppercase font-normal"
              style={{ color: '#00d4ff', fontFamily: 'DM Sans, sans-serif' }}
            >
              Desde 2014
            </span>
          </div>

          {/* Title block */}
          <div className="relative z-10">
            <motion.h1
              className="font-extrabold leading-none tracking-tight text-white mb-2"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Nosotros
            </motion.h1>
            <p
              className="font-semibold text-base tracking-[0.04em] mb-8"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Syne, sans-serif' }}
            >
              Embag Pack · México
            </p>

            <motion.p
              className="font-bold text-lg leading-snug text-white max-w-sm pt-4"
              style={{
                fontFamily: 'Syne, sans-serif',
                borderTop: '1px solid rgba(255,255,255,0.12)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Soluciones de{' '}
              <span style={{ color: '#00d4ff' }}>Inocuidad</span>
              <br />
              en Empaques
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            className="flex gap-0 relative z-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`${i > 0 ? 'border-l border-white/10 pl-8 ml-8' : ''}`}
              >
                <div
                  className="font-extrabold text-4xl text-white leading-none tracking-tight"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {s.num}
                  {s.sup && (
                    <sup
                      className="text-base font-semibold align-super"
                      style={{ color: '#00d4ff' }}
                    >
                      {s.sup}
                    </sup>
                  )}
                </div>
                <div
                  className="text-[11px] tracking-[0.1em] uppercase mt-1"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Est. badge */}
          <span
            className="absolute bottom-12 right-14 z-10 text-[11px] font-bold tracking-[0.18em] uppercase flex items-center gap-1.5"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Syne, sans-serif' }}
            aria-hidden
          >
            <span className="w-5 h-px bg-white/20 inline-block" />
            Est. 2014
          </span>
        </motion.div>

        {/* Right — light panel */}
        <motion.div
          className="flex flex-col justify-center px-14 md:pl-20 md:pr-14 py-16 transition-colors duration-300"
          style={{ background: bgColor }}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Section label */}
          <div
            className="flex items-center gap-2 mb-5 text-[10px] font-semibold tracking-[0.22em] uppercase text-[#084a77]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            <span className="w-5 h-0.5 bg-[#084a77] flex-shrink-0" />
            Quiénes somos
          </div>

          {/* Body */}
          <motion.p
            className="text-[15px] font-light leading-[1.85] mb-6 transition-colors duration-300"
            style={{ fontFamily: 'DM Sans, sans-serif', color: isDark ? 'rgba(210,235,252,0.85)' : '#3a3a3a' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Somos una empresa líder en{' '}
            <strong className="font-semibold text-[#084a77]">
              soluciones de empaque certificado
            </strong>{' '}
            con 11 años de experiencia transformando la industria del empaque en
            México. Nuestra excelencia operativa y compromiso con la calidad e
            inocuidad nos han posicionado como{' '}
            <strong className="font-semibold text-[#084a77]">
              socios estratégicos
            </strong>{' '}
            de empresas líderes en diversos sectores industriales.
          </motion.p>

          {/* Quote */}
          <motion.blockquote
            className="text-base font-light italic leading-[1.65] pl-5 transition-colors duration-300"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: isDark ? 'rgba(56,189,248,0.9)' : '#084a77',
              borderLeft: '2px solid #00d4ff',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            En creamos soluciones que
            protegen, agregando valor y confianza a su producto, respaldados por
            la experiencia y el compromiso de nuestro equipo humano.
          </motion.blockquote>
        </motion.div>
      </div>

      {/* ── Values band ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 transition-colors duration-300"
        style={{ background: cardBg, borderTop: `1px solid ${cardBorder}` }}
      >
        {VALUES.map((v, i) => (
          <ValueCard key={v.title} value={v} index={i} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} cardHover={cardHover} />
        ))}
      </div>
    </article>
  );
}
