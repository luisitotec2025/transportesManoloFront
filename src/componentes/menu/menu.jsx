// menu.jsx - RESPONSIVE
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Nombre */}
          <div className="font-bold text-lg">Manolo</div>

          {/* Botón hamburguesa (mobile) */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="sm:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Menu desktop */}
          <ul className="hidden sm:flex gap-8">
            <li><Link to="/" className="hover:text-blue-400 transition">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-blue-400 transition">Servicios</Link></li>
            <li><Link to="/flota" className="hover:text-blue-400 transition">Nuestra Flota</Link></li>
            <li><Link to="/presupuesto" className="hover:text-blue-400 transition">Presupuesto</Link></li>
            <li><Link to="/contacto" className="hover:text-blue-400 transition">Contacto</Link></li>
            <li><Link to="/panel" className="hover:text-blue-400 transition">Panel</Link></li>
          </ul>
        </div>

        {/* Menu mobile */}
        {menuAbierto && (
          <ul className="sm:hidden bg-gray-900 space-y-2 py-4 px-2">
            <li><Link to="/" onClick={() => setMenuAbierto(false)} className="block py-2 px-3 hover:bg-gray-700 rounded">Inicio</Link></li>
            <li><Link to="/servicios" onClick={() => setMenuAbierto(false)} className="block py-2 px-3 hover:bg-gray-700 rounded">Servicios</Link></li>
            <li><Link to="/flota" onClick={() => setMenuAbierto(false)} className="block py-2 px-3 hover:bg-gray-700 rounded">Nuestra Flota</Link></li>
            <li><Link to="/presupuesto" onClick={() => setMenuAbierto(false)} className="block py-2 px-3 hover:bg-gray-700 rounded">Presupuesto</Link></li>
            <li><Link to="/contacto" onClick={() => setMenuAbierto(false)} className="block py-2 px-3 hover:bg-gray-700 rounded">Contacto</Link></li>
            <li><Link to="/panel" onClick={() => setMenuAbierto(false)} className="block py-2 px-3 hover:bg-gray-700 rounded">Panel</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Menu;