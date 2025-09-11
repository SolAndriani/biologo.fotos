import React, { useState, useEffect } from "react";

const backendUrl = 'http://localhost:4000';

export default function BlackAndWhiteGallery() {

  const staticImages = Array.from(
    { length: 27 },
    (_, i) => `${backendUrl}/uploads/blackandwhite/foto${i + 1}.jpg`
  );

  const [images, setImages] = useState(staticImages);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const loadDynamicPhotos = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/photos/category/blackandwhite`);
        const urls = await res.json();
        const dynamicImages = urls.map(url => `${backendUrl}${url}`);
        const allImages = [...new Set([...staticImages, ...dynamicImages])]; // evitar duplicados
        setImages(allImages);
      } catch (err) {
        console.error("Error cargando fotos dinámicas B/N:", err);
      }
    };
    loadDynamicPhotos();
  }, []);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex((lightboxIndex + 1) % images.length);
  const goPrev = () => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);

  return (
    <section className="gallery-page">
      <div className="gallery-grid">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Blanco y Negro ${i + 1}`}
            loading="lazy"
            onClick={() => openLightbox(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-btn prev-btn" onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>
          <img
            className="lightbox-image"
            src={images[lightboxIndex]}
            alt={`Blanco y Negro ${lightboxIndex + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button className="lightbox-btn next-btn" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
          <button className="lightbox-btn close-btn" onClick={closeLightbox}>×</button>
        </div>
      )}
    </section>
  );
}
