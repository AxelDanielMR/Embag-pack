'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function OurTeam() {
  const { isDark } = useTheme();
  
  const bgColor = isDark ? '#061828' : '#061828';
  const textColor = isDark ? '#ffffff' : '#ffffff';
  const descColor = isDark ? 'rgba(186,220,244,0.8)' : 'rgba(186,220,244,0.8)';
  const accentColor = isDark ? '#38bdf8' : '#38bdf8';
  const statBg = isDark ? 'rgba(56,189,248,0.1)' : 'rgba(56,189,248,0.07)';
  const tagBorder = isDark ? 'rgba(56,189,248,0.4)' : 'rgba(56,189,248,0.35)';
  const tagBg = isDark ? 'rgba(56,189,248,0.08)' : 'rgba(56,189,248,0.07)';
  const cardBg = isDark ? 'rgba(6,24,40,0.85)' : 'rgba(6,24,40,0.82)';

  return (
    <section className="relative w-full overflow-hidden transition-colors duration-300" style={{ background: bgColor, minHeight: '560px' }}>

      {/* Diagonal slice background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(118deg, #0a2540 0%, #061828 55%, #0d3a5c 100%)',
        }}
      />

      {/* Diagonal color band */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: '52%',
          height: '100%',
          clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(160deg, #0d3a5c 0%, #1256a0 60%, #0a8acc 100%)',
          opacity: 0.55,
        }}
      />

      {/* Fine diagonal lines texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(118deg, transparent, transparent 38px, rgba(255,255,255,0.025) 38px, rgba(255,255,255,0.025) 39px)',
        }}
      />

      {/* Glowing orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '28%',
          top: '50%',
          transform: 'translate(50%, -50%)',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,130,200,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Main content grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '560px' }}>

        {/* LEFT — Text content */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-10 lg:px-20 py-16 lg:py-0"
          style={{ zIndex: 2 }}
        >
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: '36px', height: '2px', background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)' }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: accentColor,
              fontFamily: 'DM Sans, sans-serif',
            }}>
              Quiénes somos
            </span>
          </div>

          {/* Main heading */}
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              color: textColor,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Nuestro<br />
            <span style={{
              WebkitTextStroke: '2px rgba(56,189,248,0.7)',
              color: 'transparent',
            }}>
              Equipo
            </span>
          </h2>

          {/* Description */}
          <p style={{
            color: descColor,
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: '440px',
            marginBottom: '2.5rem',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            Un equipo humano comprometido con la calidad, la innovación y el servicio. Juntos construimos soluciones de empaque que cuidan tus productos y respaldan tu negocio.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mb-10">
            {[
              { value: '+15', label: 'Años de experiencia' },
              { value: '200+', label: 'Proyectos realizados' },
              { value: '98%', label: 'Clientes satisfechos' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.9rem',
                  fontWeight: 800,
                  color: accentColor,
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  color: 'rgba(186,220,244,0.6)',
                  fontFamily: 'DM Sans, sans-serif',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {['Certificados', 'Innovación', 'Calidad Total'].map((tag) => (
              <span key={tag} style={{
                padding: '6px 16px',
                borderRadius: '2px',
                border: `1px solid ${tagBorder}`,
                color: accentColor,
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'DM Sans, sans-serif',
                background: tagBg,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
          style={{ minHeight: '420px', zIndex: 1 }}
        >
          {/* Diagonal clip on image */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/image_13.jpg"
              alt="Nuestro equipo"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            {/* Overlay gradients */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(90deg, rgba(6,24,40,0.65) 0%, rgba(6,24,40,0.1) 40%, transparent 70%)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, transparent 55%, rgba(6,24,40,0.6) 100%)',
            }} />
          </div>

          {/* Floating accent card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute transition-colors duration-300"
            style={{
              bottom: '2.5rem',
              left: '2.5rem',
              background: cardBg,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56,189,248,0.25)',
              borderRadius: '4px',
              padding: '16px 22px',
              zIndex: 10,
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
                flexShrink: 0,
              }} />
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'Syne, sans-serif' }}>
                  Equipo activo
                </div>
                <div style={{ color: 'rgba(186,220,244,0.6)', fontSize: '0.72rem', fontFamily: 'DM Sans, sans-serif' }}>
                  Disponible para tu proyecto
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}