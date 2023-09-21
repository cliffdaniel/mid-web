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
    menuOpen && setShowSubMenu(false)
    setMenuOpen(!menuOpen);
    setMenuIcon(menuOpen ? 'menu' : 'close');
  };

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
      { text: 'news', link: '/news' },
      { text: 'proyectos', link: '/proyectos' },
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
          <div className="absolute right-0 z-50 top-12 w-[120px]">
            <ul className="text-right">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.text === 'proyectos' && !isAdmin ? (
                    <>
                      <label className="block py-1"
                        onMouseEnter={() => setShowSubMenu(true)}>
                        {item.text}
                      </label>
                      {showSubMenu && <ul>
                        <li>
                          <Link href="/arquitectura" className="block py-1">
                            arquitectura
                          </Link>
                        </li>
                        <li>
                          <Link href="/diseno" className="block py-1">
                            diseño
                          </Link>
                        </li>
                      </ul>}
                    </>
                  ) : (
                    <Link href={item.link} className="block py-1">
                      {item.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
