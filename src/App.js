import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Cabecera from './componentes/encabezado/cabecera';
import './componentes/encabezado/cabecera.css';
import Menu from './componentes/menu/menu';
import './componentes/menu/menu.css';
import Slider from './componentes/slider/silder';
import './componentes/slider/slider.css';
import Section from './componentes/section/section';
import './componentes/section/section.css';
import SocialMedia from './componentes/socialmedia/socialmedia';
import './componentes/socialmedia/socialmedia.css';
import Media from './componentes/media/media';
import './componentes/media/media.css';
import Contacto from './paginas/contacto';
import './paginas/contacto.css';
import Vehiculos from './componentes/vehiculos/vehiculos';
import './componentes/vehiculos/vehiculos.css';
import InfoBannerPagos from './componentes/infoBannerPagos/infoBannerPagos';
import MapaCoberturaInicio from './componentes/mapaCoberturaInicio/mapaCoberturaInicio';
import Servicios from './componentes/servicios/servicios';
import ProtectedPanel from './componentes/login/ProtectedPanel';



function App() {
  return (
    <Router>
      <Cabecera />
      <Menu />
      <SocialMedia />

      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={
          <>
            <Slider />
            <Section />
            <Media />
            <InfoBannerPagos />
            <MapaCoberturaInicio />
            
          </>
        } />

        {/* Página de contacto */}
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/flota" element={<Vehiculos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/panel" element={<ProtectedPanel />} />
        
        

      </Routes>
    </Router>
  );
}

export default App;
