import React, { useState, useEffect, useRef } from "react";
import "./HeroSlider.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
const images = ["Aguila.jpg","paisaje.jpg","pavo.jpg","pinguino.jpg","Tero.jpg","Vaca.jpg","vuelo.jpg"];

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
            src={`${backendUrl}/uploads/header/${img}`}
            alt={`Foto ${index + 1}`}
            className={`hero-image ${index === currentIndex ? "active" : ""}`}
            onClick={() => openGallery(index)}
          />
        ))}
      </section>

      {isGalleryOpen && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <button className="gallery-close" onClick={closeGallery}>✕</button>
          <button className="gallery-prev" onClick={(e)=>{e.stopPropagation(); prevImage();}}>‹</button>
          <img
            src={`${backendUrl}/uploads/header/${images[currentIndex]}`}
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
