import React, { useState, useEffect } from 'react';
import './media.css';

const images = [
  `${process.env.PUBLIC_URL}/i1.jpg`,
  `${process.env.PUBLIC_URL}/i2.jpg`,
  `${process.env.PUBLIC_URL}/i3.jpg`
];

const Media = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000); // cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="media-slider">
      <img 
        src={images[current]} 
        alt={`Slide ${current + 1}`} 
        className="media-image" 
      />
    </div>
  );
};

export default Media;
