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

  useEffect(() => {
    // URL corregida al backend en 5000
    axios.get("http://localhost:5000/api/photos/category/perfil")
      .then(res => {
        if (res.data.length > 0) setPerfilUrl(res.data[0].url);
      })
      .catch(err => console.error("Error cargando foto de perfil:", err));
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

        <div className="language-buttons">
          <button onClick={() => changeLanguage('es')}>ES</button>
          <button onClick={() => changeLanguage('en')}>EN</button>
        </div>

        <button className="menu-button" onClick={toggleMenu} aria-label="Abrir menú">&#9776;</button>
      </header>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeMenu} aria-label="Cerrar menú">✕</button>
        <nav>
          <ul>
            <li><a href="/" onClick={goToHomeTop}>{t("home")}</a></li>
            <li><a href="#sobre-mi" onClick={closeMenu}>{t("menu.about")}</a></li>
            <li><a href="#coleccion" onClick={closeMenu}>{t("menu.projects")}</a></li>
            <li>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>
                {t("menu.contact")}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}
    </>
  );
}
