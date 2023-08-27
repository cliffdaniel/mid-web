import React from 'react';
import CustomCarousel from '../components/Carousel';

const Home: React.FC = () => {
  const carouselImages = [
    {
      src: '/carousel-01.png',
      title: 'Imagen 1',
      subtitle: 'Descripción de la imagen 1',
    },
    {
      src: '/carousel-02.png',
      title: 'Imagen 2',
      subtitle: 'Descripción de la imagen 2',
    },
    {
      src: '/carousel-03.png',
      title: 'Imagen 3',
      subtitle: 'Descripción de la imagen 3',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-[170px] md:mt-[40px]">
      <div className='mx-auto w-max max-w-full md:max-w-[1140px] p-4'>
        <CustomCarousel images={carouselImages} />
      </div>
    </div>
  );
};

export default Home;
