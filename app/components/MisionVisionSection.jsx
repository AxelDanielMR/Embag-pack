"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

function DotCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let dots = [];
    let animId;
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dots = [];
      const cols = Math.ceil(canvas.width / 32);
      const rows = Math.ceil(canvas.height / 32);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * 32 + 16, y: r * 32 + 16, phase: Math.random() * Math.PI * 2, speed: 0.004 + Math.random() * 0.006 });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;
      dots.forEach((d) => {
        const pulse = Math.sin(t * d.speed + d.phase);
        const r = 1.2 + pulse * 0.6;
        const alpha = 0.08 + (pulse + 1) * 0.06;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(8,74,119,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-45" aria-hidden />;
}

function MvCard({ variant, letter, title, body, tag, tagIcon, icon, delay = 0, isDark }) {
  const isMision = variant === "mision";
  const accentColor = isMision ? "#084a77" : "#00d4ff";
  const iconBg = isDark ? (isMision ? "rgba(56,189,248,0.1)" : "rgba(0,212,255,0.15)") : (isMision ? "rgba(8,74,119,0.08)" : "rgba(0,212,255,0.10)");
  const tagBg = isDark ? (isMision ? "rgba(56,189,248,0.1)" : "rgba(0,212,255,0.12)") : (isMision ? "rgba(8,74,119,0.06)" : "rgba(0,212,255,0.08)");
  const tagColor = isMision ? (isDark ? "#38bdf8" : "#084a77") : (isDark ? "#00d4ff" : "#0077aa");
  const titleColor = isDark ? "#38bdf8" : "#0a1a2a";
  const cardBg = isDark ? "#0f1f2f" : "#ffffff";
  const cardBorder = isDark ? "rgba(56,189,248,0.15)" : "rgba(8,74,119,0.08)";
  const bodyColor = isDark ? "rgba(186,220,244,0.75)" : "#555";
  const iconColor = isDark ? "#38bdf8" : "#084a77";

  return (
    <motion.div className={`relative ${isMision ? "pr-10" : "pl-10"} transition-colors duration-300`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}>
      <span className={`absolute top-[-20px] pointer-events-none select-none leading-none z-0 transition-colors duration-500`} style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "160px", color: "rgba(8,74,119,0.06)", letterSpacing: "-0.05em", ...(isMision ? { right: "20px" } : { left: "10px" }) }} aria-hidden>
        {letter}
      </span>

      <motion.div className="relative overflow-hidden mt-10 rounded-sm transition-colors duration-300" style={{ background: cardBg, border: `1px solid ${cardBorder}` }} whileHover={{ borderColor: isDark ? "rgba(56,189,248,0.35)" : "rgba(8,74,119,0.18)", boxShadow: isDark ? "0 8px 40px rgba(56,189,248,0.1)" : "0 8px 40px rgba(8,74,119,0.06)" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: isDark ? "linear-gradient(135deg, rgba(56,189,248,0.05) 0%, transparent 60%)" : "linear-gradient(135deg, rgba(8,74,119,0.025) 0%, transparent 60%)" }} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.5 }} />

        <motion.div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accentColor, transformOrigin: "left" }} initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} />

        <div className="relative z-10 p-9">
          <motion.div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-300" style={{ background: iconBg, color: iconColor }} whileHover={{ scale: 1.08 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
            {icon}
          </motion.div>

          <h3 className="text-[28px] font-extrabold tracking-tight leading-none mb-2 transition-colors duration-300" style={{ fontFamily: "Syne, sans-serif", color: titleColor }}>
            {title}
          </h3>

          <motion.div className="h-0.5 mb-5" style={{ background: accentColor, width: 32 }} whileHover={{ width: 56 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} />

          <p className="text-[14px] font-light leading-[1.85] transition-colors duration-300" style={{ fontFamily: "DM Sans, sans-serif", color: bodyColor }}>
            {body}
          </p>

          <span className="inline-flex items-center gap-1.5 mt-6 text-[10px] font-bold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-sm transition-colors duration-300" style={{ fontFamily: "Syne, sans-serif", background: tagBg, color: tagColor }}>
            {tagIcon}
            {tag}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MisionVisionSection() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const bgColor = isDark ? "#0a1620" : "#f5f2ed";
  const textColor = isDark ? "rgba(210,235,252,0.85)" : "#0a1a2a";
  const subtextColor = isDark ? "rgba(186,220,244,0.6)" : "#888";
  const dividerColor = isDark ? "rgba(56,189,248,0.1)" : "rgba(8,74,119,0.10)";

  return (
    <section className="relative overflow-hidden transition-colors duration-300" style={{ background: bgColor }}>
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #084a77 30%, #00d4ff 60%, transparent 100%)" }} />

      <DotCanvas />

      <motion.header className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-14 pt-14 pb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className={`w-6 h-[1.5px] ${isDark ? 'bg-[#38bdf8]' : 'bg-[#084a77]'}`} />
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300" style={{ fontFamily: 'DM Sans, sans-serif', color: isDark ? '#38bdf8' : '#084a77' }}>{t('misionVision.eyebrow')}</span>
          </div>
          <h2 className="text-[48px] font-extrabold leading-none tracking-tight transition-colors duration-300" style={{ fontFamily: 'Syne, sans-serif', color: textColor }}>Misión &amp; <span className={isDark ? 'text-[#38bdf8]' : 'text-[#084a77]'}>{t('misionVision.title').split(' &')[1]?.trim()}</span></h2>
        </div>

        <p className="max-w-xs text-[14px] font-light leading-[1.7] md:text-right transition-colors duration-300" style={{ fontFamily: 'DM Sans, sans-serif', color: subtextColor }}>{t('misionVision.description')}</p>
      </motion.header>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 px-14 pb-14 gap-0">
        <div className="hidden md:block absolute top-0 bottom-10 left-1/2 w-px pointer-events-none transition-colors duration-300" style={{ background: dividerColor }} />

        <MvCard
          variant="mision"
          letter="M"
          title={t('misionVision.mission.title')}
          delay={0.1}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="#084a77" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /></svg>
          }
          body={t('misionVision.mission.description')}
          tagIcon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>}
          tag={t('misionVision.mission.tag')}
          isDark={isDark}
        />

        <MvCard
          variant="vision"
          letter="V"
          title={t('misionVision.vision.title')}
          delay={0.25}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="#0099bb" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          }
          body={t('misionVision.vision.description')}
          tagIcon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>}
          tag={t('misionVision.vision.tag')}
          isDark={isDark}
        />
      </div>
    </section>
  );
}
