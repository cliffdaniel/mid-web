import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ImageObject {
  src: string;
  title: string;
  subtitle: string;
}

interface CarouselProps {
  images: ImageObject[];
}

const CustomCarousel: React.FC<CarouselProps> = ({ images }) => {
  const renderCarouselItem = (item: ImageObject, index: number) => {
    return (
      <div key={index}>
        <div className="carousel-slide">
          <img src={item.src} alt={item.title} />
        </div>
        <div className="flex mt-[40px] justify-center items-center flex-col">
          <h3 className="text-black text-center font-medium text-sm leading-[23px] tracking-[1.4px] uppercase">
            {item.title}
          </h3>
          <p className="text-gray-300 text-center font-roboto font-light text-xs leading-[12.1px] tracking-[1.75px] uppercase">
            {item.subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-0 z-10 transform -translate-y-1/2 top-[250px] md:top-1/2"
            >
              <Image src="/carousel-left.png" alt="Prev" width={40} height={31} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-0 z-10 transform -translate-y-1/2 top-[250px] md:top-1/2"
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

export default CustomCarousel;
