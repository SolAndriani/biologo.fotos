import React, { useState, useEffect } from 'react';

export default function Hero({ photos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % photos.length);
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, [photos]);

  if (photos.length === 0) {
    return <div style={{ height: 400, background: '#eee' }}>Cargando fotos...</div>;
  }

  return (
    <div className="hero-slider">
      {photos.map((photo, i) => (
        <img
          key={i}
          src={photo.imageUrl}
          alt={`slide-${i}`}
          className={`hero-image ${i === index ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}
