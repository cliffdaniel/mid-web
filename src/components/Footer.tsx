import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <footer className="fixed bottom-0 md:bottom-2 flex items-center justify-center p-4 text-xs justify-between bg-[#F2F2F2] md:bg-transparent w-full left-0 right-0 max-w-[1640px] mx-auto">
      <div></div>
      <div className='relative'>
        {isOpen && (<div className="absolute text-[14px] text-white bg-black rounded-lg bottom-[4rem] right-[0rem] w-[319px] h-[318px] flex flex-col justify-between p-8">
            <div className='flex flex-col gap-6'>
              <p>Cortaderas 121, Yanahuara</p>
              <p>04013 Arequipa</p>
              <p>t/f 054-529179</p>
              <p>administracion@midarquitectos.com</p>
            </div>
            <p className="text-white font-medium text-base leading-[26px]">
              © 2023 MID Estudio
            </p>
            <div>
              <Link href="https://instagram.com/mid_arquitectura?igshid=NGVhN2U2NjQ0Yg==" className="text-white underline hover:underline">
                Instagram
              </Link>
            </div>
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
