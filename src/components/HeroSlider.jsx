import React, { useState, useEffect, useRef } from 'react';
import './HeroSlider.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
const images = ['Aguila.jpg','paisaje.jpg','pavo.jpg','pinguino.jpg','Tero.jpg','Vaca.jpg','vuelo.jpg'];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) setCurrentIndex(i => (i + 1) % images.length);
    }, 4000);
  };

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Galería de fotos"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((img, index) => {
        const isActive = index === currentIndex;
        const src = `${backendUrl}/uploads/header/${img}`;

        return (
          <img
            key={img}
            src={src}
            alt={`Foto ${index + 1}`}
            className={`hero-image ${isActive ? 'active' : ''}`}
            loading="lazy"
            decoding="async"
            aria-hidden={!isActive}
            role="img"
          />
        );
      })}
    </section>
  );
}
