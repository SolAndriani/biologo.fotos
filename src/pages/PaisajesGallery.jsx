import React, { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function PaisajesGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/photos/category/paisajes`);
      setPhotos(data.photos); // <-- CORREGIDO
    } catch (err) {
      console.error("Error cargando fotos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  if (loading) return <p>Cargando fotos...</p>;
  if (!photos.length) return <p>No hay fotos en esta categoría.</p>;

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex((lightboxIndex + 1) % photos.length);
  const goPrev = () => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);

  return (
    <section className="gallery-page">
      <div className="gallery-grid">
        {photos.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Paisaje ${i + 1}`}
            loading="lazy"
            onClick={() => openLightbox(i)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-btn prev-btn" onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>
          <img className="lightbox-image" src={photos[lightboxIndex]} alt={`Paisaje ${lightboxIndex + 1}`} onClick={e => e.stopPropagation()} />
          <button className="lightbox-btn next-btn" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
          <button className="lightbox-btn close-btn" onClick={closeLightbox}>×</button>
        </div>
      )}
    </section>
  );
}
