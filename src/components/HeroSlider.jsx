import React, { useState, useEffect, useRef } from "react";
import "./HeroSlider.css";

const slides = [
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028551/vuelo_gmgrl0.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028549/Vaca_vdfrna.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028547/Tero_p4xjxm.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028545/pinguino_fns6z8.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028543/pavo_a8trkr.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028541/paisaje_ewt9hm.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028539/Aguila_uief89.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1771364218/animal77_gqbtux.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1771364224/animal74_ygxrwf.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764636401/animal63_smcvhb.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1764451578/biologo-fotos/animales/d819d9bcf72f7c37e8904d2e1eb440ae.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal24_bgj5zh.jpg" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCurrentIndex((i) => (i + 1) % slides.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sliderRef}
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.src}
          alt={`Slide ${index + 1}`}
          className={`hero-image ${index === currentIndex ? "active" : ""}`}
        />
      ))}

      <div className="hero-name">
        <h1>
          <span className="first-name">AGUSTÍN</span>
          <span className="last-name">KALINOWSKI</span>
        </h1>
        <p>PHOTOGRAPHY</p>

        <div className="hero-buttons">
          <button onClick={() => handleScroll("sobre-mi")}>MI HISTORIA</button>
          <button onClick={() => handleScroll("coleccion")}>COLECCIÓN</button>
          <button onClick={() => handleScroll("contacto")}>CONTACTO</button>
        </div>
      </div>
    </section>
  );
}
