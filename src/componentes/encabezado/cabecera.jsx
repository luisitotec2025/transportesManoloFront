// cabecera.jsx - RESPONSIVE
import React from 'react';

const Cabecera = () => {
  return (
    <header className="bg-blue-600 text-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <img 
            src={`${process.env.PUBLIC_URL}/logo_empresa.png`} 
            alt="Logo Empresa" 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold">
              Transportes y Mudanzas Manolo
            </h1>
            <p className="text-sm sm:text-base text-blue-100 mt-1">
              Tu empresa de confianza para mudanzas y transporte seguro
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cabecera;