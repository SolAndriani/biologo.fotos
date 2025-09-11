import React, { useState, useEffect } from 'react';
import HeroSlider from './HeroSlider';

export default function HeaderContainer() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/photos?category=header`);
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error al cargar fotos:', error);
      }
    }

    fetchPhotos();
  }, []);

  if (!photos.length) return <p style={{textAlign: 'center', marginTop: '2rem'}}>Cargando fotos...</p>;

  return <HeroSlider photos={photos} />;
}
