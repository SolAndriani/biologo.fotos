import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

const images = ['Aguila.jpg','paisaje.jpg','pavo.jpg','pinguino.jpg','Tero.jpg','Vaca.jpg','vuelo.jpg'];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider">
      {images.map((img, index) => (
        <img
          key={img}
          src={`${backendUrl}/uploads/header/${img}`}
          alt={`Foto ${index + 1}`}
          className={`hero-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </section>
  );
}
