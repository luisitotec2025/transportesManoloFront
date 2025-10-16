import React from 'react';
import './cabecera.css';

const Cabecera = () => {
  return (
    <header className="cabecera">
      <div className="cabecera-content">
        <img 
          src={`${process.env.PUBLIC_URL}/logo_empresa.png`} 
          alt="Logo Empresa" 
          className="logo"
        />
        <div className="cabecera-text">
          <h1>Transportes y Mudanzas Manolo</h1>
          <p>Tu empresa de confianza para mudanzas y transporte seguro</p>
        </div>
      </div>
    </header>
  );
};

export default Cabecera;
