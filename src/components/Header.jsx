import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Header.css';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfilUrl, setPerfilUrl] = useState(""); 
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
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    else {
      navigate('/');
      setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  };

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <>
      <header className="header">
        {/* Logo + Título */}
        <div className="header-left" onClick={goToHomeTop}>
          <img src={perfilUrl || "/icons/ping.png"} alt="Logo / Perfil" className="logo" />
          <div className="title-container">
            <h1 className="header-title">
              <span className="first-name">Agustín</span>
              <span className="last-name">Kalinowski</span>
            </h1>
            <p className="subtitle">PHOTOGRAPHY</p>
          </div>
        </div>

        {/* Botones de idioma */}
        <div className="lang-buttons">
          <button className="lang-btn" onClick={() => changeLanguage('es')}>ES</button>
          <button className="lang-btn" onClick={() => changeLanguage('en')}>EN</button>
        </div>

        {/* Botón de menú */}
        <button className="menu-button" onClick={toggleMenu} aria-label="Abrir menú">&#9776;</button>
      </header>

      {/* Side Menu */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeMenu} aria-label="Cerrar menú">✕</button>
        <nav>
          <ul>
            <li><a href="#sobre-mi" onClick={closeMenu}>{t("intro")}</a></li>
            <li><a href="#coleccion" onClick={closeMenu}>{t("collection")}</a></li>
            <li><a href="#animales" onClick={closeMenu}>{t("animals")}</a></li>
            <li><a href="#paisajes" onClick={closeMenu}>{t("landscapes")}</a></li>
            <li><a href="#blanco-negro" onClick={closeMenu}>{t("black_white")}</a></li>
            <li>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>
                {t("contact")}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}
    </>
  );
}
