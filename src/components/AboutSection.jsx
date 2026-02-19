import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./AboutSection.css";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
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
        <div className="about-image-wrapper">
          <img
            src="https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028577/Agus_u9ctxp.jpg"
            alt="Agustín Kalinowski"
            className="about-image"
          />
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