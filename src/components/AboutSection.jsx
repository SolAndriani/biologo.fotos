import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./AboutSection.css";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

async function fetchPerfil() {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/perfil.json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.resources || data.resources.length === 0) return null;
  const r = data.resources[0];
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${r.public_id}.${r.format}`;
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  const [perfilUrl, setPerfilUrl] = useState(null);

  useEffect(() => {
    fetchPerfil().then((url) => {
      if (url) setPerfilUrl(url);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="about-section" id="sobre-mi" ref={sectionRef}>
      <div className="about-container">
        <div className="about-image-wrapper">
          {perfilUrl && (
            <img
              src={perfilUrl}
              alt="Agustín Kalinowski"
              className="about-image"
            />
          )}
        </div>
        <div className="about-text">
          <h2>{t("hello_name", { name: "Agus" })}</h2>
          <p>{t("bio_paragraph_1")}</p>
          <p>{t("bio_paragraph_2")}</p>
        </div>
      </div>
    </section>
  );
}