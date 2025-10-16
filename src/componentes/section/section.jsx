import React from 'react';
import './section.css';

const Section = () => {
  return (
    <section className="section">
      <div className="container" id="container1">
        <div className="container-img-wrapper">
          <img src={`${process.env.PUBLIC_URL}/img1.png`} alt="Servicio 1" />
        </div>
        <h3>Mudanzas Locales</h3>
        <p>Transporte seguro y rápido dentro de El Salvador para tus pertenencias.</p>
      </div>

      <div className="container" id="container2">
        <div className="container-img-wrapper">
          <img src={`${process.env.PUBLIC_URL}/img2.png`} alt="Servicio 2" />
        </div>
        <h3>Traslados de Oficina</h3>
        <p>Organización y embalaje profesional para el traslado de tu oficina o empresa.</p>
      </div>

      <div className="container" id="container3">
        <div className="container-img-wrapper">
          <img src={`${process.env.PUBLIC_URL}/img3.png`} alt="Servicio 3" />
        </div>
        <h3>Viajes Nacionales</h3>
        <p>Transporte confiable a cualquier parte del país, servicio 24/7 y seguro.</p>
      </div>
    </section>
  );
};

export default Section;
