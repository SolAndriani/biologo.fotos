import React, { useState } from 'react';

const staticImages = [
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028536/foto27_ifaycj.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028534/foto26_enufdk.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028532/foto25_hyzkwd.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028530/foto24_fzmt6v.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028529/foto23_tzfdfz.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028528/foto22_an5b6n.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028524/foto21_fg1wzx.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028523/foto20_yrry4s.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028520/foto19_lspetc.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028520/foto18_ebds15.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028518/foto17_xxds1o.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028515/foto16_gtkoaa.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028512/foto15_m72zyw.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028509/foto14_jgb7kt.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028507/foto13_jfd2ba.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028505/foto12_e4pyop.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028499/foto9_bgb6ka.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028497/foto8_wu5dzp.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028495/foto7_eixfhy.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028493/foto6_a4uyda.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028491/foto5_ss9sop.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028490/foto4_wjamwl.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028487/foto3_nfosqn.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028485/foto2_lfjygs.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028483/foto1_sqegkd.jpg"
];

export default function BlackAndWhiteGallery() {
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
            alt={`B&W ${i + 1}`}
            loading="lazy"
            onClick={() => openLightbox(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-btn prev-btn" onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>
          <img className="lightbox-image" src={staticImages[lightboxIndex]} alt={`B&W ${lightboxIndex + 1}`} onClick={e => e.stopPropagation()} />
          <button className="lightbox-btn next-btn" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
          <button className="lightbox-btn close-btn" onClick={closeLightbox}>×</button>
        </div>
      )}
    </section>
  );
}
