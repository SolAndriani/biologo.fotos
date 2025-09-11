import React, { useState, useEffect } from 'react';

export default function Hero({ photos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % photos.length);
    }, 4000); 
  }, [photos]);

  if (photos.length === 0) return <div style={{ height: 400, background: '#eee' }}>Cargando fotos...</div>;

  const photo = photos[index];

  return (
    <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
      <img
        src={photo.imageUrl}
        alt={photo.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{
        position: 'absolute', bottom: 10, left: 20, color: 'white', textShadow: '0 0 5px black', fontSize: 24,
      }}>
        {photo.title}
      </div>
    </div>
  );
}
