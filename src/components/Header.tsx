import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  isAdmin: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isAdmin }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState('menu');

  const toggleMenu = () => {
    // menuOpen && setShowSubMenu(false)
    setMenuOpen(!menuOpen);
    setMenuIcon(menuOpen ? 'menu' : 'close');
  };

  const toggleProject = () => {
    setShowSubMenu(!showSubMenu)
  }

  const menuItems = isAdmin
    ? [
      { text: 'proyectos', link: '/admin/proyectos' },
      { text: 'arquitectura', link: '/admin/arquitectura' },
      { text: 'diseño', link: '/admin/diseno' },
      { text: 'equipo', link: '/admin/equipo' },
      { text: 'cerrar sesión', link: '/admin/logout' },
    ]
    : [
      { text: 'estudio', link: '/estudio' },
      { text: 'arquitectura', link: '/arquitectura' },
      { text: 'diseño', link: '/diseno' },
    ];

  return (
    <header className="fixed z-[3000] flex justify-between p-4 md:pt-[60px] items-center bg-[#F2F2F2] w-full left-0 right-0 max-w-[1640px] mx-auto">
      <div className="logo">
        <Link href={`/`}>
          <Image src="/mid-logo.png" alt="Logo" width={111} height={42} />
        </Link>
      </div>
      <div className="relative cursor-pointer right-2">
        {menuIcon === 'menu' ? (
          <span className='text-bold' onClick={toggleMenu}>Menu</span>
        ) : (
          <FiX size={24} className="cursor-pointer" onClick={toggleMenu} />
        )}
        {menuOpen && (
          <div className="absolute right-0 z-50 top-12 w-[120px]">
            <ul className="text-right">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="block py-1" onClick={toggleMenu}>
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
