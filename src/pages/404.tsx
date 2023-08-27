import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[150px]">
      <h1 className="mb-4 text-4xl font-semibold">Página no encontrada</h1>
      <p className="mb-8 text-lg text-gray-600">La página que estás buscando no existe.</p>
      <Link className="text-blue-600 hover:underline" href="/">
        Volver a la página principal
      </Link>
    </div>
  );
};

export default Custom404;
