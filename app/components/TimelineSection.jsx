'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// ─── Data ─────────────────────────────────────────────────────
const getEras = (t) => [
  {
    years: t('timeline.eras.era1.period'),
    name: t('timeline.eras.era1.title'),
    accent: '#4a9eff',
    tagBg: 'rgba(74,158,255,.12)',
    tagColor: '#4a9eff',
    items: t('timeline.eras.era1.points'),
  },
  {
    years: t('timeline.eras.era2.period'),
    name: t('timeline.eras.era2.title'),
    accent: '#00b8d4',
    tagBg: 'rgba(0,184,212,.12)',
    tagColor: '#00b8d4',
    items: t('timeline.eras.era2.points'),
  },
  {
    years: t('timeline.eras.era3.period'),
    name: t('timeline.eras.era3.title'),
    accent: '#00d4b0',
    tagBg: 'rgba(0,212,176,.12)',
    tagColor: '#00d4b0',
    items: t('timeline.eras.era3.points'),
  },
  {
    years: t('timeline.eras.era4.period'),
    name: t('timeline.eras.era4.title'),
    accent: '#66ccff',
    tagBg: 'rgba(102,204,255,.12)',
    tagColor: '#66ccff',
    items: t('timeline.eras.era4.points'),
  },
];

// ─── Era Card ─────────────────────────────────────────────────
function EraCard({ era, index, isDark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const cardBg = isDark ? '#0f1f2f' : '#ffffff';
  const cardBorder = isDark ? 'rgba(56,189,248,0.15)' : 'rgba(7,40,64,0.04)';
  const connectorColor = isDark ? 'rgba(56,189,248,0.1)' : 'rgba(7,40,64,0.04)';
  const textColor = isDark ? '#38bdf8' : '#072840';
  const bodyColor = isDark ? 'rgba(186,220,244,0.75)' : 'rgba(7,40,64,0.8)';

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0 pr-8 transition-colors duration-300"
      style={{ width: 310, ['--accent']: era.accent }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="absolute left-[20px] top-0 w-px h-8 pointer-events-none transition-colors duration-300" style={{ background: connectorColor }} />

      <motion.div className="absolute top-[-5px] left-[15px] w-[10px] h-[10px] rounded-full z-10 transition-colors duration-300" style={{ background: era.accent, border: isDark ? `2px solid #1a2d40` : '2px solid #0a1e30', outline: `2px solid ${era.accent}55` }} whileHover={{ scale: 1.5 }} transition={{ duration: 0.3 }} />

      <motion.div className="relative overflow-hidden mt-10 rounded-sm transition-colors duration-300" style={{ background: cardBg, border: `1px solid ${cardBorder}` }} initial={{ background: cardBg }} whileHover={{ background: cardBg, borderColor: `${era.accent}44`, y: -4 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
        <motion.div className="absolute top-0 left-0 bottom-0 w-[3px] origin-top" style={{ background: era.accent }} initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }} transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }} />

        <div className="p-6 pb-5">
          <span className="inline-block text-[12px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm mb-2.5 transition-colors duration-300" style={{ fontFamily: 'Syne, sans-serif', background: era.tagBg, color: era.tagColor }}>{era.years}</span>

          <h3 className="text-[16px] font-bold leading-snug mb-4 transition-colors duration-300" style={{ fontFamily: 'Syne, sans-serif', color: textColor }}>{era.name}</h3>

          <ul className="flex flex-col gap-2 list-none">
            {Array.isArray(era.items) && era.items.map((item) => (
              <li key={item} className="relative pl-4 text-[12.5px] font-light leading-relaxed transition-colors duration-300" style={{ color: bodyColor, fontFamily: 'DM Sans, sans-serif' }}>
                <span className="absolute left-0 top-[8px] w-1 h-1 rounded-full opacity-70" style={{ background: era.accent }} />
                {item}
              </li>
            ))}
          </ul>

          <div className="h-0.5 rounded-full mt-5 overflow-hidden transition-colors duration-300" style={{ background: isDark ? 'rgba(56,189,248,0.08)' : 'rgba(7,40,64,0.03)' }}>
            <motion.div className="h-full rounded-full" style={{ background: era.accent }} initial={{ width: '0%' }} animate={inView ? { width: '100%' } : {}} transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: [0.23, 1, 0.32, 1] }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Timeline Section ─────────────────────────────────────────
export default function TimelineSection() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const eras = getEras(t);
  const bgColor = isDark ? '#071420' : '#eaf6ff';
  const spineColor = isDark ? 'rgba(56,189,248,0.08)' : 'rgba(7,40,64,0.04)';
  const fadeLeft = isDark ? 'linear-gradient(to right, #071420, transparent)' : 'linear-gradient(to right, #eaf6ff, transparent)';
  const fadeRight = isDark ? 'linear-gradient(to left, #071420, transparent)' : 'linear-gradient(to left, #eaf6ff, transparent)';
  const textColor = isDark ? '#38bdf8' : '#072840';

  const scrollRef = useRef(null);

  // drag-to-scroll
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };
  const onMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden" style={{ background: bgColor }}>
      <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent 0%, #084a77 30%, #00d4ff 60%, transparent 100%)' }} />

      {/* Noise / fades */}
      <div className="absolute top-0 bottom-0 left-0 w-20 pointer-events-none z-10" style={{ background: fadeLeft }} />
      <div className="absolute top-0 bottom-0 right-0 w-20 pointer-events-none z-10" style={{ background: fadeRight }} />

      <motion.div className="relative z-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-14 pt-14 pb-9 transition-colors duration-300" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[1.5px]" style={{ background: '#66ccff' }} />
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300" style={{ color: '#66ccff', fontFamily: 'DM Sans, sans-serif' }}>{t('timeline.eyebrow')}</span>
          </div>
          <h2 className="text-[44px] font-extrabold leading-none tracking-tight transition-colors duration-300" style={{ fontFamily: 'Syne, sans-serif', color: textColor }}>
            {t('timeline.title').split(' ').slice(0, -1).join(' ')} <span style={{ color: '#66ccff' }}>{t('timeline.title').split(' ').slice(-1)[0]}</span>
          </h2>
        </div>
      </motion.div>

      <div ref={scrollRef} className="relative z-20 overflow-x-auto overflow-y-visible pb-14 px-14 transition-colors duration-300" style={{ scrollbarWidth: 'none', cursor: 'grab' }} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onMouseMove={onMouseMove}>
        <div className="absolute top-9 left-0 right-0 h-px pointer-events-none transition-colors duration-300" style={{ background: spineColor }} />

        <div className="flex items-start w-max pt-9 pb-2">
          {eras.map((era, i) => (
            <EraCard key={era.years} era={era} index={i} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
