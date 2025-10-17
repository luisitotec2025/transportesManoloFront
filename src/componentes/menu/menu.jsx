import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/flota">Nuestra Flota</Link></li>
        <li><Link to="/presupuesto">Presupuesto</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/panel">Panel de Administración</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
