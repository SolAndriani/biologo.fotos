import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="language-buttons">
        <button onClick={() => changeLanguage("es")}>ES</button>
        <button onClick={() => changeLanguage("en")}>EN</button>
      </div>
    </header>
  );
}
