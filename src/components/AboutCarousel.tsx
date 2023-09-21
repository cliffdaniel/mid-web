import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CarouselProps {
  images: string[];
}

export const AboutCarousel: React.FC<CarouselProps> = ({ images }) => {
  const renderCarouselItem = (item: string, index: number) => {
    return (
      <div key={index}>
        <div key={item} className="carousel-slide">
          <img src={item} alt={item} />
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto">
      <Carousel
        key={'aboutCarousel'}
        showArrows={true}
        showThumbs={false}
        showStatus={true}
        infiniteLoop={true}
        className="about-carousel"
        statusFormatter={(current, total) => `${current} / ${total}`}
        renderArrowPrev={(onClickHandler, hasPrev, label) => ('')}
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-0 md:right-[60px] z-10 transform -translate-y-1/2 custom-next-button bottom-[20px]"
            >
              <Image src="/carousel-right.png" alt="Next" width={40} height={31} />
            </button>
          )
        }
      >
        {images.map(renderCarouselItem)}
      </Carousel>
    </div>
  );
};