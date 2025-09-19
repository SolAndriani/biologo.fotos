import React, { useState, useEffect, useRef } from "react";
import "./HeroSlider.css";

const images = [
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028551/vuelo_gmgrl0.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028549/Vaca_vdfrna.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028547/Tero_p4xjxm.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028545/pinguino_fns6z8.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028543/pavo_a8trkr.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028541/paisaje_ewt9hm.jpg",
  "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028539/Aguila_uief89.jpg"
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) setCurrentIndex(i => (i + 1) % images.length);
    }, 4000);
  };

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  const openGallery = (index) => {
    setCurrentIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => setIsGalleryOpen(false);

  const prevImage = () => setCurrentIndex((currentIndex + images.length - 1) % images.length);
  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);

  return (
    <>
      <section
        className="hero-slider"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Foto ${index + 1}`}
            className={`hero-image ${index === currentIndex ? "active" : ""}`}
            // onClick={() => openGallery(index)}  <-- eliminado
          />
        ))}
      </section>

      {isGalleryOpen && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <button className="gallery-close" onClick={closeGallery}>✕</button>
          <button className="gallery-prev" onClick={(e)=>{e.stopPropagation(); prevImage();}}>‹</button>
          <img
            src={images[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            className="gallery-image"
            onClick={(e)=>e.stopPropagation()}
          />
          <button className="gallery-next" onClick={(e)=>{e.stopPropagation(); nextImage();}}>›</button>
        </div>
      )}
    </>
  );
}
