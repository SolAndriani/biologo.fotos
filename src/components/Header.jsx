import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfilUrl, setPerfilUrl] = useState(""); // Estado para la foto de perfil
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Traer foto de perfil desde MongoDB
  useEffect(() => {
    axios.get("/api/photos?category=perfil")
      .then(res => {
        if (res.data.length > 0) setPerfilUrl(res.data[0].url);
      })
      .catch(err => console.error(err));
  }, []);

  const goToHomeTop = () => {
    closeMenu();
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const scrollToContact = () => {
    closeMenu();
    const section = document.getElementById('contacto');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const sec = document.getElementById('contacto');
        sec?.scrollIntoView({ behavior: 'smooth' });
      }, 300); 
    }
  };

  return (
    <>
      <header className="header">
        <div
          className="header-left"
          onClick={goToHomeTop}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          {/* Foto de perfil dinámica o fallback al logo */}
          <img
            src={perfilUrl || "/icons/ping.png"}
            alt="Logo / Perfil"
            className="logo"
          />
          <div className="title-container">
            <h1 className="header-title">
              <span className="first-name">Agustín</span>
              <span className="last-name">Kalinowski</span>
            </h1>
            <p className="subtitle">PHOTOGRAPHY</p>
          </div>
        </div>

        <button className="menu-button" onClick={toggleMenu} aria-label="Abrir menú">
          &#9776;
        </button>
      </header>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeMenu} aria-label="Cerrar menú">✕</button>
        <nav>
          <ul>
            <li><a href="#sobre-mi" onClick={closeMenu}>MI HISTORIA</a></li>
            <li><a href="#coleccion" onClick={closeMenu}>COLECCIÓN</a></li>
            <li>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>
                CONTACTO
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}
    </>
  );
}
