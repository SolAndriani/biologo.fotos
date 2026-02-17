import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

const backendUrl = "http://localhost:5000";

export default function Gallery({ category }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/photos/category/${category}`
        );
        setPhotos(data);
      } catch (err) {
        console.error("Error cargando fotos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [category]);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll(".gallery-item");

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [photos]);

  if (loading) return null;
  if (!photos.length) return null;

  return (
    <section className="gallery-section">
      <div className="gallery-grid" ref={gridRef}>
        {photos.map((photo) => (
          <div key={photo._id} className="gallery-item">
            <img
              src={photo.url}
              alt={photo.title || photo.category}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
