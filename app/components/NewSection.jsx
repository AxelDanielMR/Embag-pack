"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const getIMAGES = (t) => [
  {
    id: "10",
    src: "/images/image_10.jpg",
    label: t('newSection.images.innovation'),
    offset: "mt-0",
  },
  {
    id: "11",
    src: "/images/image_11.jpg",
    label: t('newSection.images.quality'),
    offset: "mt-7",
  },
  {
    id: "12",
    src: "/images/image_12.jpg",
    label: t('newSection.images.sustainability'),
    offset: "-mt-3",
  },
  {
    id: "02",
    src: "/images/image_02.jpg",
    label: t('newSection.images.efficiency'),
    offset: "mt-4",
  },
];

// ─── Tilt Card ────────────────────────────────────────────────
function TiltCard({
  image,
  index,
}) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-sm cursor-pointer ${image.offset}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(0,0,0,0.35), 0 0 20px rgba(0,212,255,0.2)" }}
    >
      {/* Image */}
      <motion.img
        src={image.src}
        alt={image.label}
        className="w-full h-60 object-cover"
        style={{ filter: "saturate(0.85) brightness(0.92)" }}
        whileHover={{ scale: 1.06, filter: "saturate(1.1) brightness(1)" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 flex items-end p-3.5"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,212,255,0.55) 0%, rgba(8,74,119,0.4) 100%)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <motion.span
          className="font-syne text-[11px] font-bold tracking-widest uppercase text-white"
          initial={{ y: 8 }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {image.label}
        </motion.span>
      </motion.div>

      {/* Border on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{ border: "1px solid transparent" }}
        whileHover={{ border: "1px solid rgba(0,212,255,0.7)" }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-30"
        style={{
          borderTop: "2px solid #00d4ff",
          borderRight: "2px solid #00d4ff",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// ─── New Section ─────────────────────────────────────────────
export default function NewSection() {
  const { t } = useLanguage();
  const IMAGES = getIMAGES(t);
  return (
    <section
      className="relative flex items-center gap-16 px-14 py-24 overflow-hidden min-h-[720px] w-full"
      style={{ background: "#084a77" }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute -left-20 -bottom-20 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── LEFT ── */}
      <div className="flex-1 flex flex-col gap-6 relative z-10">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="w-8 h-px"
            style={{ background: "#00d4ff" }}
          />
          <span
            className="text-[11px] tracking-[0.22em] uppercase font-normal"
            style={{ color: "#00d4ff", fontFamily: "DM Sans, sans-serif" }}
          >
            {t('newSection.eyebrow')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-extrabold leading-[1.1] tracking-tight text-white text-left"
          style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          {t('newSection.title1')}
          <br />
          {t('newSection.title2')}
          <br />
          <em className="not-italic font-bold" style={{ color: "#00d4ff" }}>
            {t('newSection.title3')}
          </em>
          <br />
          {t('newSection.title4')}
        </motion.h1>

        {/* Body */}
        <motion.p
          className="text-[15px] font-light leading-[1.75] max-w-sm"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "DM Sans, sans-serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('newSection.description')}
        </motion.p>

        {/* CTA */}
        <motion.button
          className="inline-flex items-center gap-2.5 mt-2 w-fit px-6 py-3
                     text-[13px] font-bold tracking-[0.1em] uppercase
                     bg-transparent transition-colors duration-300"
          style={{
            border: "1px solid rgba(0,212,255,0.5)",
            color: "#00d4ff",
            fontFamily: "Syne, sans-serif",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          whileHover={{
            backgroundColor: "rgba(0,212,255,0.1)",
            borderColor: "#00d4ff",
          }}
        >
          {t('newSection.button')}
          <motion.span
            className="text-base"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* ── RIGHT — 2×2 staggered grid ── */}
      <div
        className="flex-1 grid grid-cols-2 gap-3 relative z-10"
        style={{ perspective: "900px" }}
      >
        {IMAGES.map((img, i) => (
          <TiltCard key={img.id} image={img} index={i} />
        ))}
      </div>
    </section>
  );
}