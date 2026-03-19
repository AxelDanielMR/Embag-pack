'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// ─── Data ─────────────────────────────────────────────────────
const getVALUES = (t) => [
  { label: t('valores.values.honesty.title'),         desc: t('valores.values.honesty.description'),                  color: '#084a77' },
  { label: t('valores.values.responsibility.title'),    desc: t('valores.values.responsibility.description'),                  color: '#084a77' },
  { label: t('valores.values.empathy.title'),            desc: t('valores.values.empathy.description'),          color: '#0e6fa8' },
  { label: t('valores.values.respect.title'),            desc: t('valores.values.respect.description'),                       color: '#0e6fa8' },
  { label: t('valores.values.humility.title'),           desc: t('valores.values.humility.description'),                        color: '#1288c4' },
  { label: t('valores.values.confidentiality.title'),   desc: t('valores.values.confidentiality.description'),            color: '#1288c4' },
  { label: t('valores.values.quality.title'),            desc: t('valores.values.quality.description'),               color: '#009fcc' },
  { label: t('valores.values.foodSafety.title'),          desc: t('valores.values.foodSafety.description'),                 color: '#009fcc' },
  { label: t('valores.values.continuousImprovement.title'),    desc: t('valores.values.continuousImprovement.description'),                       color: '#00b8d4' },
  { label: t('valores.values.communication.title'),       desc: t('valores.values.communication.description'),                color: '#00b8d4' },
  { label: t('valores.values.customerService.title'),desc: t('valores.values.customerService.description'),              color: '#00d4ff' },
  { label: t('valores.values.punctuality.title'),        desc: t('valores.values.punctuality.description'),                color: '#00d4ff' },
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
            className="flex-shrink-0 w-[7px] h-[7px] rounded-full transition-colors duration-300"
            style={{ background: color }}
          />
          <span
            className="whitespace-nowrap text-[14px] font-semibold transition-colors duration-300"
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
  const { t } = useLanguage();
  const VALUES = getVALUES(t);
  
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
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300" style={{ fontFamily: 'DM Sans, sans-serif', color: isDark ? '#38bdf8' : '#084a77' }}>{t('valores.eyebrow')}</span>
          </div>
          <h2 className="text-[44px] font-extrabold leading-none tracking-tight transition-colors duration-300" style={{ fontFamily: 'Syne, sans-serif', color: textColor }}>
            {t('valores.title').split(' ')[0]} <span className={isDark ? 'text-[#38bdf8]' : 'text-[#084a77]'}>{t('valores.title').split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>

        <p className="max-w-[280px] text-[13px] font-light leading-[1.75] md:text-right transition-colors duration-300" style={{ fontFamily: 'DM Sans, sans-serif', color: subtextColor }}>
          {t('valores.subtitle')}
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
