import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    } else {
      window.removeEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <footer className="fixed bottom-2 flex items-center justify-center p-4 text-xs md:justify-between bg-transparent w-full left-0 right-0 max-w-[1440px] mx-auto">
      <p className="text-black font-medium text-base leading-[26px]">
        © 2023 MID Estudio
      </p>
      <div className='relative'>
        {isOpen && (<div className="absolute text-white bg-black rounded-lg bottom-[4rem] right-[0rem] w-[319px] h-[318px] gap-6 flex flex-col p-8">
            <p>Cortaderas 121, Yanahuara</p>
            <p>04013 Arequipa</p>
            <p>t/f +51 333 333 333</p>
            <p>administracion@midarquitectos.com</p>
        </div>
        )}
        <div className="flex items-center justify-center bg-black rounded-full w-[60px] h-[60px] cursor-pointer"
          onClick={toggleDiv}>
          <Image src="/footer-icon.png" alt="Logo" width={30} height={30} />
        </div>
      </div>
    </footer>
  );
};
