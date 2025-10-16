import React from 'react';
import './mapaCoberturaInicio.css';

const MapaCoberturaInicio = () => {
  return (
    <div className="container-map-inicio">
      <h2 className="titulo-cobertura">COBERTURA A NIVEL NACIONAL</h2>
      <div className="mapa-frame">
        <iframe
          title="Mapa de El Salvador"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1262713.902592527!2d-90.27872794837802!3d13.723444232419736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6330d6c8c3e019%3A0x3cc4c9d4b3e02c8!2sEl%20Salvador!5e0!3m2!1ses!2ssv!4v1693509339582!5m2!1ses!2ssv"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapaCoberturaInicio;
