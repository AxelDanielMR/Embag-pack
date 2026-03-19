'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState } from 'react';

const Counter = ({ from, to, duration }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const start = performance.now();

    const animate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (to - from) + from);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [from, to, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default function FeatureCard({
  leftContent,
  isLeftImage = true,
  title,
  description,
  type = 'stats', // 'stats' or 'image'
  badges = [], // for displaying badge items on the right
  tabs = [], // optional: array of { key, label, icon, title, summary }
}) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(tabs && tabs.length ? tabs[0].key : null);
  return (
    <div className="relative w-full" style={{ minHeight: '460px' }}>
      
      {/* Left Card (behind on desktop, hidden on mobile) */}
      <motion.div
        className="hidden sm:block absolute top-0 left-0 w-[58%] h-full rounded-3xl overflow-hidden shadow-2xl z-0"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {type === 'stats' ? (
          // Stats Content with Animated Numbers
          <div className={`w-full h-full p-6 sm:p-10 flex flex-col items-center justify-center transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            {/* First Counter */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={`text-5xl sm:text-7xl lg:text-8xl font-bold mb-3 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                <Counter from={0} to={250} duration={2000} />+
              </div>
              <p className={`text-sm sm:text-xl font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {t('featureCard.counters.satisfiedClients')}
              </p>
            </motion.div>

            {/* Second Counter */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={`text-5xl sm:text-7xl lg:text-8xl font-bold mb-3 ${isDark ? 'text-emerald-400' : 'text-teal-600'}`}>
                <Counter from={0} to={15000} duration={2000} />
              </div>
              <p className={`text-sm sm:text-xl font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {t('featureCard.counters.tonnesProduced')}
              </p>
            </motion.div>
          </div>
        ) : (
          // Image Content
          <Image
            src={leftContent}
            alt="Feature content"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 58vw"
            priority
          />
        )}
      </motion.div>

      {/* Right Card - Title and Description (full-width on mobile, overlapped on desktop) */}
      <motion.div
        className={`w-full sm:w-[52%] absolute sm:top-8 sm:right-0 rounded-3xl shadow-2xl sm:z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-center transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
        style={{ minHeight: '380px' }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      >
        {/* Right card content: show either static title/description or tab-driven content */}
        {tabs && tabs.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 flex-wrap">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === t.key 
                      ? isDark ? 'bg-cyan-900/50 text-cyan-300' : 'bg-blue-100 text-blue-700'
                      : isDark ? 'bg-slate-700 text-slate-300' : 'bg-white/10 text-gray-800'
                  }`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="pt-2"
              >
                {(() => {
                  const t = tabs.find((x) => x.key === activeTab);
                  if (!t) return null;
                  return (
                    <div>
                      <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
                      <p className={`text-sm sm:text-base lg:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{t.summary}</p>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`text-sm sm:text-base lg:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}
            >
              {description}
            </motion.div>
          </>
        )}

        {/* Badges Section */}
        {badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ${isDark ? 'bg-cyan-900/30 text-cyan-300' : 'bg-blue-100 text-blue-700'}`}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
