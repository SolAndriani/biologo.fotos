import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const backendUrl = "http://localhost:5000"; // tu backend local

export default function Gallery({ category }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/photos/category/${category}`);
        setPhotos(data); // guardamos el array de fotos
      } catch (err) {
        console.error("Error cargando fotos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [category]);

  if (loading) return <p>Cargando fotos...</p>;
  if (!photos.length) return <p>No hay fotos en esta categoría.</p>;

  return (
    <div className="gallery-grid">
      {photos.map(photo => (
        <div key={photo._id} className="gallery-item">
          <img src={photo.url} alt={photo.title || photo.category} />
          {photo.title && <p className="photo-title">{photo.title}</p>}
        </div>
      ))}
    </div>
  );
}
