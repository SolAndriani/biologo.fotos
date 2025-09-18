// AnimalesGallery.jsx
import React, { useState } from 'react';

export default function AnimalesGallery() {
  const staticImages = [
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal23_fuzmxq.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal24_bgj5zh.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal19_bonzoj.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal22_pigev1.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal21_km464x.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal18_ehxmsn.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027813/animal20_aheiid.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027812/animal17_nffeix.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027812/animal16_pfiyww.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027810/animal13_t7pgfg.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal14_eknrwh.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal10_xbsp5x.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal15_ljuyap.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal12_fixlms.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal11_d3p4yg.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal9_q1ndep.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal8_opyvlv.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal5_pthjwj.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal3_q1pmqj.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal7_jnhtrk.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal6_nqavt9.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal4_ets0mo.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027806/animal1_ogysuy.jpg",
    "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027806/animal2_tzvud1.jpg"
  ];

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
            alt={`Animal ${i + 1}`}
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
            src={staticImages[lightboxIndex]}
            alt={`Animal ${lightboxIndex + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button className="lightbox-btn next-btn" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
          <button className="lightbox-btn close-btn" onClick={closeLightbox}>×</button>
        </div>
      )}
    </section>
  );
}
