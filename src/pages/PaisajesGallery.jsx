import React, { useState } from 'react';


const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

export default function PaisajesGallery() {
  
  const staticImages = Array.from(
    { length: 20 },
    (_, i) => `${backendUrl}/uploads/paisajes/paisaje${i + 1}.jpg`
  );

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex((lightboxIndex + 1) % staticImages.length);
  const goPrev = () => setLightboxIndex((lightboxIndex - 1 + staticImages.length) % staticImages.length);

  return (
    <section className="gallery-page">
      <div className="gallery-grid">
        {staticImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Paisaje ${i + 1}`}
            loading="lazy"
            onClick={() => openLightbox(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-btn prev-btn" onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>
          <img className="lightbox-image" src={staticImages[lightboxIndex]} alt={`Paisaje ${lightboxIndex + 1}`} onClick={e => e.stopPropagation()} />
          <button className="lightbox-btn next-btn" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
          <button className="lightbox-btn close-btn" onClick={closeLightbox}>×</button>
        </div>
      )}
    </section>
  );
}
