import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState('menu');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setMenuIcon(menuOpen ? 'menu' : 'close');
  };

  const menuItems = [
    { text: 'estudio', link: '/estudio' },
    { text: 'news', link: '/news' },
    { text: 'proyectos', link: '/proyectos' },
    { text: 'arquitectura', link: '/arquitectura' },
    { text: 'diseño', link: '/diseno' },
  ];

  return (
    <header className="flex justify-between p-4 mt-[60px]">
      <div className="logo">
        <Link href={`/`}>
          <Image src="/mid-logo.png" alt="Logo" width={111} height={42} />
        </Link>
      </div>
      <div className="relative" onClick={toggleMenu}>
        {menuIcon === 'menu' ? (
          <FiMenu size={24} className="cursor-pointer" />
        ) : (
          <FiX size={24} className="cursor-pointer" />
        )}
        {menuOpen && (
          <div className="absolute right-0 z-50 top-12">
            <ul className="text-right">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="block py-1">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
