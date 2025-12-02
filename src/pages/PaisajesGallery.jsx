import React, { useState } from "react";
import "./PhotoGallery.css";

export default function PaisajesGallery({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!photos.length) return <p>No hay fotos en esta categoría.</p>;

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex((lightboxIndex + 1) % photos.length);
  const goPrev = () => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);

  return (
    <div className="gallery-grid">
      {photos.map((photo, i) => (
        <img
          key={photo._id || i}
          src={photo.url}
          alt={`Paisaje ${i + 1}`}
          onClick={() => openLightbox(i)}
          style={{ cursor: "pointer" }}
        />
      ))}

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-btn prev-btn" onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>
          <img className="lightbox-image" src={photos[lightboxIndex].url} onClick={e => e.stopPropagation()} />
          <button className="lightbox-btn next-btn" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
          <button className="lightbox-btn close-btn" onClick={closeLightbox}>×</button>
        </div>
      )}
    </div>
  );
}
