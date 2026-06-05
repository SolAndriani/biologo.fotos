import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./HeroSlider.css";

const CLOUD_NAME = "dbkpfcqqp";

async function fetchSliderImages() {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/slider.json`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.resources.map(
    (r) => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${r.public_id}.${r.format}`
  );
}

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchSliderImages().then((imgs) => {
      if (imgs.length > 0) {
        setSlides(imgs);
        setLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!loaded || slides.length === 0) return;
    const interval = setInterval(() => {
      if (!paused) {
        setCurrentIndex((i) => (i + 1) % slides.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [paused, loaded, slides.length]);

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
      {slides.map((src, index) => (
        <img
          key={index}
          src={src}
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
          <button onClick={() => handleScroll("sobre-mi")}>{t("menu.about")}</button>
          <button onClick={() => handleScroll("coleccion")}>{t("menu.projects")}</button>
          <button onClick={() => handleScroll("contacto")}>{t("menu.contact")}</button>
        </div>
      </div>
    </section>
  );
}