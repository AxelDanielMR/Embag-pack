'use client';

import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
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
    { number: '300+', label: 'Clientes Satisfechos', icon: '👥' },
    { number: '20,000+', label: 'Productos Disponibles', icon: '📦' },
    { number: 'Nacional', label: 'Cobertura a Nivel País', icon: '🗺️' },
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
            title="Ofreciendo el mejor Empaque Flexible de Polietileno de baja densidad certificado"
            description="En Embag Pack, priorizamos su satisfacción al ofrecer un empaque certificado, con procesos basados en el desarrollo de nuestro capital humano. Comprometido con la inocuidad, calidad y el servicio a nuestros clientes y sociedad en general."
          />

          {/* Feature Card 2 - Image Section */}
          <FeatureCard
            type="image"
            leftContent="/images/image_04.jpg"
            isLeftImage={true}
            title="Priorizando la Seguridad Interna y la Protección del Cliente"
            description="En Embag Pack, estamos dedicados a brindar a nuestros clientes el más alto nivel de inocuidad y calidad, a través de nuestras certificaciones y nuestro compromiso con medidas de seguridad internas, alcanzamos la seguridad y confianza de nuestros clientes al trabajar con nosotros."
            badges={['Inocuidad', 'Procesos Certificados', 'Materia Prima']}
          />

          {/* Feature Card 3 - Image with industry tabs */}
          <FeatureCard
            type="image"
            leftContent="/images/image_05.jpg"
            isLeftImage={true}
            tabs={[
              {
                key: 'automotriz',
                label: 'Automotriz',
                icon: <Truck className="w-5 h-5" />,
                title: 'Soluciones de Empaque Especializadas para la Industria Automotriz',
                summary: 'En Embag Pack, comprendemos la importancia crítica del empaque en la industria automotriz. Nuestros servicios están diseñados para proteger componentes delicados y optimizar la cadena de suministro con soluciones personalizadas.'
              },
              {
                key: 'alimenticia',
                label: 'Alimenticia',
                icon: <Coffee className="w-5 h-5" />,
                title: 'Soluciones de Empaque Innovadoras para la Industria Alimenticia',
                summary: 'En Embag Pack, reconocemos la importancia de la seguridad y frescura en la industria alimenticia. Ofrecemos soluciones que preservan calidad y cumplen normativas de inocuidad alimentaria.'
              },
              {
                key: 'agro',
                label: 'Agroindustria',
                icon: <Leaf className="w-5 h-5" />,
                title: 'Soluciones de Empaque Confiables para la Agroindustria',
                summary: 'Entendemos la importancia de la trazabilidad y protección en la agroindustria. Brindamos soluciones que garantizan seguridad, cumplimiento normativo y preservación del producto.'
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
