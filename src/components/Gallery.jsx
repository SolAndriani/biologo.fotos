import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Gallery({ category }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/photos/category/${category}`);
        setPhotos(data); // ahora es directamente el array
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
      {photos.map((photo) => (
        <img key={photo._id} src={photo.fullUrl} alt={photo.title || photo.category} />
      ))}
    </div>
  );
}
