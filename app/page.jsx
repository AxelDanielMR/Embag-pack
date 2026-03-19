'use client';

import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';
import Link from 'next/link';
import CarouselPresentation from './components/CarouselPresentation';
import FeatureCard from './components/FeatureCard';
import { Truck, Coffee, Leaf } from 'lucide-react';
import SectionBackground from './components/SectionBackground';
import ButtonHover from './components/ButtonHover';
import OurPackages from './components/OurPackages';
import NewSection from './components/NewSection';
import CertificationsSection from './components/CertificationsSection';

export default function Home() {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const stats = [
    { number: '300+', label: t('homePage.stats.satisfiedClients'), icon: '👥' },
    { number: '20,000+', label: t('homePage.stats.availableProducts'), icon: '📦' },
    { number: 'Nacional', label: t('homePage.stats.nationalCoverage'), icon: '🗺️' },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Carousel Presentation Section */}
      <CarouselPresentation />

      {/* Feature Cards Section with Shared Background */}
      <SectionBackground>
        <div className="space-y-24">
          {/* Feature Card 1 - Stats */}
          <FeatureCard
            type="stats"
            title={t('homePage.featureCards.title1')}
            description={t('homePage.featureCards.description1')}
          />

          {/* Feature Card 2 - Image Section */}
          <FeatureCard
            type="image"
            leftContent="/images/image_04.jpg"
            isLeftImage={true}
            title={t('homePage.featureCards.title2')}
            description={t('homePage.featureCards.description2')}
            badges={[t('homePage.badges.foodSafety'), t('homePage.badges.certifiedProcesses'), t('homePage.badges.rawMaterials')]}
          />

          {/* Feature Card 3 - Image with industry tabs */}
          <FeatureCard
            type="image"
            leftContent="/images/image_05.jpg"
            isLeftImage={true}
            tabs={[
              {
                key: 'automotriz',
                label: t('homePage.industries.automotive'),
                icon: <Truck className="w-5 h-5" />,
                title: t('homePage.industries.automotiveTitle'),
                summary: t('homePage.industries.automotiveDesc')
              },
              {
                key: 'alimenticia',
                label: t('homePage.industries.foodBeverage'),
                icon: <Coffee className="w-5 h-5" />,
                title: t('homePage.industries.foodTitle'),
                summary: t('homePage.industries.foodDesc')
              },
              {
                key: 'agro',
                label: t('homePage.industries.agroIndustry'),
                icon: <Leaf className="w-5 h-5" />,
                title: t('homePage.industries.agroTitle'),
                summary: t('homePage.industries.agroDesc')
              },
            ]}
          />
        </div>
      </SectionBackground>

      {/* Our Packages workspace section */}
      <OurPackages />

      {/* New Section */}
      <NewSection />

      {/* Certifications Section */}
      <CertificationsSection />

    </main>
  );
}
