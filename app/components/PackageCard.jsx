'use client';

import Image from 'next/image';

export default function PackageCard({ image, title, description }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      {/* Left - Image */}
      <div className="w-full lg:w-5/12 flex-shrink-0">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right - Content */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h3 className="text-2xl lg:text-3xl font-bold text-white">{title}</h3>
        <p className="text-white/90 leading-relaxed text-sm lg:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
