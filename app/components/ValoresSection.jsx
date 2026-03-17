'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ─── Data ─────────────────────────────────────────────────────
const VALUES = [
  { label: 'Honestidad',         desc: 'Transparencia total en cada acuerdo',                  color: '#084a77' },
  { label: 'Responsabilidad',    desc: 'Cumplimos lo que prometemos, siempre',                  color: '#084a77' },
  { label: 'Empatía',            desc: 'Entendemos las necesidades de nuestros socios',          color: '#0e6fa8' },
  { label: 'Respeto',            desc: 'Trato digno en cada interacción',                       color: '#0e6fa8' },
  { label: 'Humildad',           desc: 'Aprendemos de cada experiencia',                        color: '#1288c4' },
  { label: 'Confidencialidad',   desc: 'Información protegida con total discreción',            color: '#1288c4' },
  { label: 'Calidad',            desc: 'Estándares certificados en cada empaque',               color: '#009fcc' },
  { label: 'Inocuidad',          desc: 'Seguridad alimentaria sin compromisos',                 color: '#009fcc' },
  { label: 'Mejora Continua',    desc: 'Innovación como práctica diaria',                       color: '#00b8d4' },
  { label: 'Comunicación',       desc: 'Claridad y oportunidad en cada mensaje',                color: '#00b8d4' },
  { label: 'Servicio al Cliente',desc: 'Atención excepcional, siempre disponible',              color: '#00d4ff' },
  { label: 'Puntualidad',        desc: 'Compromisos de entrega que se respetan',                color: '#00d4ff' },
];

// ─── Animated counter hook ────────────────────────────────────
function useCounter(target, active, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf;

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

// ─── Single value row ─────────────────────────────────────────
function ValueRow({ label, desc, color, index, isDark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCounter(100, inView);
  const textColor = isDark ? 'rgba(210,235,252,0.9)' : '#0a1a2a';
  const descColor = isDark ? 'rgba(186,220,244,0.6)' : '#999';
  const counterColor = isDark ? '#38bdf8' : '#084a77';
  const bgTrack = isDark ? 'rgba(56,189,248,0.08)' : 'rgba(8,74,119,0.08)';

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Label row */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          {/* Dot */}
          <span
            className="w-[7px] h-[7px] rounded-full flex-shrinkuppercase transition-colors duration-300"
            style={{ fontFamily: 'Syne, sans-serif', color: textColor }}
          >
            {label}
          </span>
        </div>

        {/* Counter */}
        <span
          className="text-[22px] font-extrabold leading-none tracking-tight transition-colors duration-300"
          style={{ fontFamily: 'Syne, sans-serif', color: counterColor }}
        >
          {count}
          <sup className="text-[11px] font-semibold text-[#00d4ff]" style={{ verticalAlign: 'super' }}>
            %
          </sup>
        </span>
      </div>

      {/* Track */}
      <div
        className="h-[6px] rounded-full overflow-hidden transition-colors duration-300"
        style={{ background: bgTrack }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}66)`,
          }}
          initial={{ width: '0%' }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.1, delay: index * 0.06 + 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* shimmer */}
          <motion.span
            className="absolute top-0 left-0 h-full w-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
            }}
            animate={inView ? { x: ['-100%', '250%'] } : {}}
            transition={{
              duration: 2.4,
              delay: index * 0.06 + 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Description */}
      <p
        className="text-[12px] font-light leading-[1.5] transition-colors duration-300 text-[#999]"
        style={{ fontFamily: 'DM Sans, sans-serif', color: descColor }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────
export default function ValoresSection() {
  const { isDark } = useTheme();
  
  const bgColor = isDark ? '#0a1620' : '#f5f2ed';
  const textColor = isDark ? 'rgba(210,235,252,0.9)' : '#0a1a2a';
  const subtextColor = isDark ? 'rgba(186,220,244,0.6)' : '#888';
  return (
    <section className="relative overflow-hidden transition-colors duration-300" style={{ background: bgColor }}>
      {/* Top accent */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #084a77 30%, #00d4ff 65%, transparent)' }} />

      {/* Watermark */}
      <span className="absolute bottom-[-40px] right-[-20px] pointer-events-none select-none leading-none" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '220px', letterSpacing: '-0.05em', color: 'rgba(8,74,119,0.04)' }} aria-hidden>
        VAL
      </span>

      <motion.header className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-14 pt-14 pb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className={`w-6 h-[1.5px] ${isDark ? 'bg-[#38bdf8]' : 'bg-[#084a77]'}`} />
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300" style={{ fontFamily: 'DM Sans, sans-serif', color: isDark ? '#38bdf8' : '#084a77' }}>Embag Pack · ADN corporativo</span>
          </div>
          <h2 className="text-[44px] font-extrabold leading-none tracking-tight transition-colors duration-300" style={{ fontFamily: 'Syne, sans-serif', color: textColor }}>
            Nuestros <span className={isDark ? 'text-[#38bdf8]' : 'text-[#084a77]'}>Valores</span>
          </h2>
        </div>

        <p className="max-w-[280px] text-[13px] font-light leading-[1.75] md:text-right transition-colors duration-300" style={{ fontFamily: 'DM Sans, sans-serif', color: subtextColor }}>
          Compromiso con la Excelencia — cada producto que desarrollamos refleja nuestra dedicación.
        </p>
      </motion.header>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 px-14 pb-14">
        {VALUES.map((v, i) => (
          <ValueRow key={v.label} {...v} index={i} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}
