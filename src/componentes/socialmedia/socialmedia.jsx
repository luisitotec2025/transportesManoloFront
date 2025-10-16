import React from 'react';
import './socialmedia.css';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="social-media-container">
      <h3 className="social-title">Contáctenos a nuestras redes sociales:</h3>

      <div className="social-media">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn facebook"
        >
          <FaFacebookF className="icon" />
          Facebook
        </a>

        <a
          href="https://wa.me/50372208777"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn whatsapp"
        >
          <FaWhatsapp className="icon" />
          WhatsApp
       </a>

      </div>

      
    </div>
    
  );
};

export default SocialMedia;

