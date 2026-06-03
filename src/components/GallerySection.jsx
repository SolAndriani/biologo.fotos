import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './GallerySection.css';

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

async function fetchPortada(tag) {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.resources || data.resources.length === 0) return null;
  const r = data.resources[0];
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${r.public_id}.${r.format}`;
}

export default function GallerySection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  const [portadas, setPortadas] = useState({
    animals: null,
    landscapes: null,
    black_and_white: null,
  });

  useEffect(() => {
    fetchPortada("portada-animales").then((img) =>
      setPortadas((prev) => ({ ...prev, animals: img }))
    );
    fetchPortada("portada-paisajes").then((img) =>
      setPortadas((prev) => ({ ...prev, landscapes: img }))
    );
    fetchPortada("portada-blanco-y-negro").then((img) =>
      setPortadas((prev) => ({ ...prev, black_and_white: img }))
    );
  }, []);

  const categories = [
    { key: 'animals', route: '/animales' },
    { key: 'landscapes', route: '/paisajes' },
    { key: 'black_and_white', route: '/black-and-white' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
          else entry.target.classList.remove('visible');
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current.querySelectorAll('.fade-slide');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section id="coleccion" className="gallery-section" ref={sectionRef}>
      <div className="gallery-header fade-slide" style={{ animationDelay: '0s' }}>
        <h1 className="background-text">{t('gallery.title')}</h1>
        <h2 className="gallery-subtitle">{t('gallery.subtitle')}</h2>
      </div>

      <div className="gallery-container">
        {categories.map(({ key, route }, index) => (
          <div
            key={key}
            className="category-card fade-slide"
            style={{
              backgroundImage: portadas[key] ? `url(${portadas[key]})` : 'none',
              backgroundColor: portadas[key] ? 'transparent' : '#222',
              animationDelay: `${(index + 1) * 0.1}s`
            }}
            title={t(`categories.${key}`)}
            onClick={() => navigate(route)}
          >
            <div className="category-label">{t(`categories.${key}`)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}