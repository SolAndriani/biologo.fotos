import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './GallerySection.css';

export default function GallerySection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { t } = useTranslation();

 
  const categories = [
    { key: 'animals', image: 'https://res.cloudinary.com/dmixd7wpb/image/upload/v1771364218/animal77_gqbtux.jpg', route: '/Animales' },
    { key: 'landscapes', image: 'https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028406/paisaje11_u4bsqx.jpg', route: '/paisajes' },
    { key: 'black_and_white', image: 'https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028503/foto11_rp1kq0.jpg', route: '/black-and-white' }
  ];

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
        <h1 className="background-text">{t('gallery.title')}</h1>
        <h2 className="gallery-subtitle">{t('gallery.subtitle')}</h2>
      </div>

      <div className="gallery-container">
        {categories.map(({ key, image, route }, index) => (
          <div
            key={key}
            className="category-card fade-slide"
            style={{
              backgroundImage: `url(${image})`,
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

