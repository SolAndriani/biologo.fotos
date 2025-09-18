import React, { useState } from 'react';

const staticImages = [
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028551/paisaje_ewt9hm.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028408/paisaje12_rmctpr.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028406/paisaje11_u4bsqx.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028405/paisaje10_mz0t35.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028402/paisaje9_lt3aih.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028400/paisaje8_tgqdvx.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028398/paisaje7_c7hbne.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028396/paisaje6_wixzom.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028394/paisaje5_oyvrax.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028394/paisaje4_migxkv.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028391/paisaje3_fxxpxw.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028391/paisaje2_darvil.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028389/paisaje1_xud8rb.jpg",
];

export default function PaisajesGallery() {
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
