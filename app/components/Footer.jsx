'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Empaques', href: '/empaques' },
  { label: 'Contacto', href: '/contacto' },
];

const PHONE_NUMBERS = [
  { label: '(351) 516 2740', href: 'tel:+523515162740' },
  { label: '(351) 516 2642', href: 'tel:+523515162642' },
];

// ─── Section label with right line ────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span
        className="text-[10px] font-bold tracking-[0.22em] uppercase whitespace-nowrap"
        style={{ color: '#00d4ff', fontFamily: 'Syne, sans-serif' }}
      >
        {children}
      </span>
      <span className="flex-1 h-px" style={{ background: 'rgba(0,212,255,0.25)' }} />
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#051e30' }}>
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #00d4ff 0%, rgba(0,212,255,0.2) 60%, transparent 100%)',
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom-right radial glow */}
      <div
        className="absolute -right-16 -bottom-16 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 grid grid-cols-1 gap-12 px-14 pt-14 pb-12 md:grid-cols-3 md:gap-12">

        {/* ── Col 1: Brand + Address ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {/* Logo */}
          <div className="text-[28px] font-extrabold leading-none tracking-tight text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Embag<span style={{ color: '#00d4ff' }}>.</span>Pack
          </div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-7" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}>
            Desde 2014
          </p>

          {/* Address */}
          <div className="text-[13px] font-light leading-[1.85]" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Sans, sans-serif' }}>
            Jacona, Michoacán
            <br />
            Lerdo de Tejada Poniente #150
            <br />
            CP 59800, México

            <strong className="block font-normal text-[11px] tracking-[0.15em] uppercase mt-5 mb-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Teléfono
            </strong>
            {PHONE_NUMBERS.map((p, i) => (
              <span key={p.href}>
                <a href={p.href} className="transition-colors duration-200 hover:text-[#00d4ff]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {p.label}
                </a>
                {i < PHONE_NUMBERS.length - 1 && <span style={{ color: 'rgba(255,255,255,0.25)' }}> · </span>}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Col 2: Menu ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <SectionLabel>Menú</SectionLabel>

          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm font-normal transition-all duration-200" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'DM Sans, sans-serif' }}>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: '#00d4ff' }}>→</span>
                  <span className="group-hover:text-white transition-colors duration-200">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Col 3: CTA ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <SectionLabel>Contacto</SectionLabel>

          {/* CTA box with corner accents */}
          <div className="relative p-6 rounded-sm" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.18)' }}>
            {/* Corner accents — top-left */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none" style={{ borderTop: '1.5px solid #00d4ff', borderLeft: '1.5px solid #00d4ff' }} />
            {/* Corner accents — bottom-right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none" style={{ borderBottom: '1.5px solid #00d4ff', borderRight: '1.5px solid #00d4ff' }} />

            <p className="text-[10px] tracking-[0.2em] uppercase mb-2.5" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>¿Trabajemos juntos?</p>

            <p className="text-[15px] font-bold leading-snug text-white mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>¿Interesado en trabajar con nosotros?</p>

            <a href="mailto:contacto@embag.com.mx" className="block text-[13px] break-all transition-opacity duration-200 hover:opacity-75" style={{ color: '#00d4ff', fontFamily: 'DM Sans, sans-serif' }}>
              contacto@embag.com.mx
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-14 py-5 mx-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-[12px] tracking-[0.04em]" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'DM Sans, sans-serif' }}>
          © 2020–25 Embag Pack
          <span style={{ color: 'rgba(255,255,255,0.12)', margin: '0 8px' }}>·</span>
          Todos los derechos reservados
        </p>

        {/* Accent dot */}
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(0,212,255,0.4)' }} />
      </div>
    </footer>
  );
}
