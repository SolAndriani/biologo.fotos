import React, { useEffect, useRef } from 'react';
import './AboutSection.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section className="about-section" id="sobre-mi" ref={sectionRef}>
      <div className="about-container">
        <img
          src={`${backendUrl}/uploads/perfil/Agus.jpg`}
          alt="Agustín Kalinowski"
          className="about-image"
        />
        <div className="about-text">
          <h2>Hola, soy Agus</h2>
          <p>
            Soy argentino y hace algunos años me mudé a Estados Unidos, donde estudié Biología y comencé a formarme profesionalmente.
            Hoy, con 24 años, sigo manteniendo viva mi pasión por la naturaleza y los animales.
          </p>
          <p>
            La fotografía se convirtió en mi forma de conectar con ese mundo que tanto amo, de observar con atención y contar historias a través de imágenes. 
            Esta página es mi espacio para compartir esa admiración.
          </p>
        </div>
      </div>
    </section>
  );
}
