'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';

const contactInfo = {
  address: {
    city: 'Jacona, Michoacán',
    street: 'Lerdo de Tejada Poniente #150',
    cp: 'CP 59800 — Jacona, Michoacán, México',
  },
  phones: ['(351) 516 2740', '(351) 516 2642'],
  emails: [
    'contacto@embag.com.mx',
    'ventas@embag.com.mx',
    'aventas@embag.com.mx',
    'aventas2@embag.com.mx',
  ],
};

const subjects = [
  'Ventas y cotizaciones',
  'Soporte técnico',
  'Información general',
  'Otro',
];

function InfoBlock({ label, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#38bdf8',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          {label}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(56,189,248,0.2)' }} />
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(56,189,248,0.7)', marginBottom: '8px',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(56,189,248,0.18)',
  borderRadius: '3px',
  color: 'rgba(210,235,252,0.9)',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.95rem',
  padding: '13px 16px',
  outline: 'none',
};

// Coordenadas de Embag Pack
const PLACE_ID = 'ChIJO8mhihuJLoQRO5_1PCF6pn0';
const LAT = 19.96367;
const LNG = -102.30639;

export default function Contact() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', subject: '', message: '',
  });
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', form);
    setSent(true);
  };

  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;
  const staticMapFallback = `https://maps.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`;

  const inputStyleDynamic = {
    width: '100%', boxSizing: 'border-box',
    background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(56,189,248,0.18)' : 'rgba(27,165,217,0.4)'}`,
    borderRadius: '3px',
    color: isDark ? 'rgba(210,235,252,0.9)' : '#0d4a3a',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.95rem',
    padding: '13px 16px',
    outline: 'none',
  };

  // Degradado modo claro: suave, aireado, de cielo pálido a menta muy tenue
  const lightBg = 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 35%, #ecfdf5 70%, #f0fdf4 100%)';
  const darkBg  = 'linear-gradient(180deg, #04111e 0%, #1e3a8a 50%, #0d4a3a 100%)';

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: mounted ? (isDark ? darkBg : lightBg) : lightBg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      <Header />
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 50%, transparent 100%)',
      }} />

      {/* Diagonal lines texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(118deg, transparent, transparent 60px, rgba(${isDark ? '255,255,255' : '0,0,0'},0.018) 60px, rgba(${isDark ? '255,255,255' : '0,0,0'},0.018) 61px)`,
      }} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)' }} />
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#38bdf8',
            }}>
              Contáctanos
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 800, lineHeight: 0.95,
            color: isDark ? '#fff' : '#051e30', letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            Estamos<br />
            <span style={{ WebkitTextStroke: `2px ${isDark ? 'rgba(56,189,248,0.65)' : 'rgba(56,189,248,0.8)'}`, color: 'transparent' }}>
              Listos
            </span>
          </h1>
          <p style={{ color: isDark ? 'rgba(186,220,244,0.65)' : '#051e30', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '500px' }}>
            Recibimos sus consultas con gusto. Nuestro equipo está disponible para atenderle y brindarle la mejor solución en empaques.
          </p>
        </motion.div>

        {/* Info + Form Grid */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
          style={{ border: `1px solid ${isDark ? 'rgba(56,189,248,0.12)' : 'rgba(27,165,217,0.3)'}`, borderRadius: '4px' }}
        >
          {/* INFO PANEL */}
          <div className="relative overflow-hidden p-12 lg:p-14"
            style={{
              background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(56,189,248,0.04)',
              borderRight: `1px solid ${isDark ? 'rgba(56,189,248,0.12)' : 'rgba(27,165,217,0.2)'}`,
            }}
          >
            <div className="absolute top-0 right-0 pointer-events-none" style={{
              width: '200px', height: '200px',
              background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
            }} />
            <div className="absolute bottom-8 right-8 pointer-events-none select-none" style={{
              fontFamily: 'Syne, sans-serif', fontSize: '5rem', fontWeight: 800,
              color: isDark ? 'rgba(56,189,248,0.06)' : 'rgba(56,189,248,0.12)', lineHeight: 1, letterSpacing: '-0.04em',
            }}>
              2005
            </div>

            <InfoBlock label="Ubicación">
              <p style={{ color: isDark ? 'rgba(210,235,252,0.85)' : '#051e30', lineHeight: 1.75 }}>
                <strong style={{ color: isDark ? '#fff' : '#051e30', fontFamily: 'Syne, sans-serif', display: 'block', marginBottom: '4px', fontSize: '1.1rem' }}>
                  Jacona, Michoacán
                </strong>
                {contactInfo.address.street}<br />
                {contactInfo.address.cp}
              </p>
            </InfoBlock>

            <InfoBlock label="Teléfonos">
              <div className="flex flex-col gap-2">
                {contactInfo.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\D/g, '')}`}
                    style={{ color: isDark ? 'rgba(210,235,252,0.85)' : '#051e30', fontSize: '1.05rem', fontWeight: 500 }}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock label="Correo Electrónico">
              <div className="flex flex-col gap-1">
                {contactInfo.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`}
                    style={{ color: isDark ? '#38bdf8' : '#0284c7', fontSize: '0.9rem', opacity: 0.85 }}
                    className="hover:opacity-100 hover:underline transition-opacity"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </InfoBlock>
          </div>

          {/* FORM PANEL */}
          <div className="p-12 lg:p-14" style={{ background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(56,189,248,0.02)' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', color: '#22c55e',
                }}>✓</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', color: isDark ? '#fff' : '#051e30', fontSize: '1.4rem', fontWeight: 800 }}>
                  Mensaje enviado
                </h3>
                <p style={{ color: isDark ? 'rgba(186,220,244,0.6)' : 'rgba(5,30,48,0.6)', fontSize: '0.95rem' }}>
                  Le responderemos en un plazo máximo de 24 horas hábiles.
                </p>
                <button onClick={() => setSent(false)} style={{
                  marginTop: '8px', padding: '10px 24px',
                  border: `1px solid ${isDark ? 'rgba(56,189,248,0.35)' : 'rgba(56,189,248,0.5)'}`, borderRadius: '3px',
                  color: isDark ? '#38bdf8' : '#0284c7', background: isDark ? 'rgba(56,189,248,0.07)' : 'rgba(56,189,248,0.1)',
                  fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', fontSize: '0.9rem',
                }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: isDark ? '#fff' : '#051e30', marginBottom: '8px' }}>
                  Envíenos un mensaje
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombre">
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Su nombre completo" required style={inputStyleDynamic} />
                  </Field>
                  <Field label="Empresa">
                    <input name="company" value={form.company} onChange={handleChange}
                      placeholder="Nombre de su empresa" style={inputStyleDynamic} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Teléfono">
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="(000) 000 0000" type="tel" style={inputStyleDynamic} />
                  </Field>
                  <Field label="Email">
                    <input name="email" value={form.email} onChange={handleChange}
                      placeholder="correo@empresa.com" type="email" required style={inputStyleDynamic} />
                  </Field>
                </div>

                <Field label="Asunto">
                  <select name="subject" value={form.subject} onChange={handleChange}
                    style={{ ...inputStyleDynamic, appearance: 'none' }}>
                    <option value="">Seleccione un tema…</option>
                    {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label="Mensaje">
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Describa su consulta o necesidad…" required rows={5}
                    style={{ ...inputStyleDynamic, resize: 'vertical' }} />
                </Field>

                <button type="submit" style={{
                  padding: '15px 32px', borderRadius: '3px', border: 'none',
                  background: isDark ? 'linear-gradient(118deg, #0ea5e9 0%, #0284c7 100%)' : 'linear-gradient(118deg, #38bdf8 0%, #0284c7 100%)',
                  color: '#fff', fontFamily: 'Syne, sans-serif',
                  fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  Enviar mensaje →
                </button>
                <p style={{ fontSize: '0.75rem', color: isDark ? 'rgba(186,220,244,0.35)' : 'rgba(5,30,48,0.35)', textAlign: 'center' }}>
                  Respondemos en un plazo máximo de 24 horas hábiles.
                </p>
              </form>
            )}
          </div>
        </motion.div>

        {/* ── MAP SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 overflow-hidden"
          style={{
            border: `1px solid ${isDark ? 'rgba(56,189,248,0.12)' : 'rgba(27,165,217,0.3)'}`,
            borderRadius: '4px',
            position: 'relative',
          }}
        >
          {/* Map header bar */}
          <div
            className="flex items-center justify-between px-8 py-4 flex-wrap gap-3"
            style={{
              background: isDark ? 'rgba(255,255,255,0.025)' : '#ffffff',
              borderBottom: `1px solid ${isDark ? 'rgba(56,189,248,0.12)' : 'rgba(27,165,217,0.2)'}`,
            }}
          >
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5Z" fill="#38bdf8" opacity="0.9"/>
                <circle cx="8" cy="6" r="1.5" fill={isDark ? '#04111e' : '#ffffff'}/>
              </svg>
              <span style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                color: isDark ? '#fff' : '#051e30', fontSize: '0.95rem', letterSpacing: '0.01em',
              }}>
                Embag Pack S.A. De C.V.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span style={{ fontSize: '0.8rem', color: isDark ? 'rgba(186,220,244,0.5)' : 'rgba(5,30,48,0.5)', fontFamily: 'DM Sans, sans-serif' }}>
                Calle Lerdo de Tejada Pte 150, Centro — Jacona de Plancarte, Mich.
              </span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '7px 16px', borderRadius: '3px', whiteSpace: 'nowrap',
                  border: `1px solid ${isDark ? 'rgba(56,189,248,0.35)' : 'rgba(56,189,248,0.5)'}`,
                  color: isDark ? '#38bdf8' : '#0284c7', background: isDark ? 'rgba(56,189,248,0.07)' : 'rgba(56,189,248,0.1)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem',
                  fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
              >
                Abrir en Maps
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 9L9 2M9 2H4M9 2v5" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Map iframe */}
          <div style={{ position: 'relative', height: '400px' }}>
            <iframe
              src={staticMapFallback}
              width="100%"
              height="100%"
              style={{
                border: 'none',
                display: 'block',
                filter: 'saturate(0.7) brightness(0.85) contrast(1.1)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Embag Pack"
            />
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: '40px',
                background: isDark ? 'linear-gradient(180deg, rgba(4,17,30,0.3) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Bottom strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6"
          style={{ borderTop: `1px solid ${isDark ? 'rgba(56,189,248,0.08)' : 'rgba(56,189,248,0.15)'}` }}>
          <span style={{ fontSize: '0.8rem', color: isDark ? 'rgba(186,220,244,0.35)' : 'rgba(5,30,48,0.35)' }}>
            Sirviendo a nuestros clientes desde <span style={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 600 }}>2005</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: isDark ? 'rgba(186,220,244,0.35)' : 'rgba(5,30,48,0.35)' }}>
            Jacona, Michoacán <span style={{ color: isDark ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.5)' }}>·</span> México
          </span>
        </div>

      </div>
    </section>
  );
}