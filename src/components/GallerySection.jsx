import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './GallerySection.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const categories = [
  {
    name: 'Animales',
    image: `${backendUrl}/uploads/Animales/animal16.jpg`,
    route: '/Animales',
  },
  {
    name: 'Paisajes',
    image: `${backendUrl}/uploads/paisajes/paisaje11.jpg`,
    route: '/paisajes',
  },
  {
    name: 'Blanco y Negro',
    image: `${backendUrl}/uploads/blackandwhite/foto8.jpg`,
    route: '/black-and-white',
  },
];

export default function GallerySection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.fade-slide');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

 return (
  <section id="coleccion" className="gallery-section" ref={sectionRef}>
    <div className="gallery-header fade-slide" style={{ animationDelay: '0s' }}>
      <h1 className="background-text">COLECCIÓN</h1>
      <h2 className="gallery-subtitle">Naturaleza detenida en una imagen</h2>
    </div>

    <div className="gallery-container">
      {categories.map(({ name, image, route }, index) => (
        <div
          key={name}
          className="category-card fade-slide"
          style={{
            backgroundImage: `url(${image})`,
            animationDelay: `${(index + 1) * 0.1}s`,
          }}
          title={name}
          onClick={() => navigate(route)}
        >
          <div className="category-label">{name}</div>
        </div>
      ))}
    </div>
  </section>
);
 }
