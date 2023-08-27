import React from 'react';
import { AboutCarousel } from '../components/AboutCarousel';
import { RIGHT_CONTENT_1, RIGHT_CONTENT_2, RIGHT_CONTENT_3 } from '../constants';

const Estudio: React.FC = () => {
  const carouselImages = ['/carousel-estudio.png', '/carousel-estudio.png', '/carousel-estudio.png', '/carousel-estudio.png'];

  return (
    <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 max-w-[1140px] mx-auto px-4 md:px-[35px]">
      <div>
        <AboutCarousel images={carouselImages} />
      </div>
      <div>
        <div className="text-black font-neue-haas-grotesk-display-pro text-[13px] leading-[23px] mb-[30px]">
          {RIGHT_CONTENT_1}
        </div>
        <div className="text-black font-neue-haas-grotesk-display-pro text-[13px] leading-[23px] mb-[30px]">
          {RIGHT_CONTENT_2}
        </div>
        <div className="text-black font-neue-haas-grotesk-display-pro text-[13px] leading-[23px]">
          {RIGHT_CONTENT_3}
        </div>
      </div>
    </div>
  );
};

export default Estudio;
