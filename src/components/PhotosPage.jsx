import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import axios from "axios";
import UploadForm from "./UploadForm";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

const staticPhotos = {
  animales: Array.from({ length: 24 }, (_, i) => `${backendUrl}/uploads/animales/animal${i + 1}.jpg`),
  paisajes: Array.from({ length: 13 }, (_, i) => `${backendUrl}/uploads/paisajes/paisaje${i + 1}.jpg`),
  blackandwhite: Array.from({ length: 27 }, (_, i) => `${backendUrl}/uploads/blackandwhite/foto${i + 1}.jpg`),
};

export default function PhotosPage({ loggedIn }) {
  const { category } = useParams();
  const lowerCategory = category?.toLowerCase();

  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const loadPhotos = async () => {
    if (!lowerCategory) return;
    const staticImages = staticPhotos[lowerCategory] || [];
    try {
      const res = await axios.get(`${backendUrl}/api/photos/category/${lowerCategory}`);
      const dynamicPhotos = res.data.photos.map(url => `${backendUrl}${url}`);
      const allPhotos = [...staticImages, ...dynamicPhotos.filter(url => !staticImages.includes(url))];
      setPhotos(allPhotos);
    } catch (err) {
      console.error("Error cargando fotos:", err);
      setPhotos(staticImages);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [lowerCategory]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Preparar fotos para el lightbox (objeto con src)
  const slides = photos.map(src => ({ src }));

  return (
    <div className="photos-page">
      <h1>{lowerCategory?.charAt(0).toUpperCase() + lowerCategory?.slice(1)}</h1>

      {loggedIn && <UploadForm categorySelected={lowerCategory} onUploadSuccess={loadPhotos} />}

      {photos.length === 0 ? (
        <p>No hay fotos en esta categoría.</p>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`${lowerCategory}-${index}`}
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </Masonry>
      )}

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
          // opciones extra, ej: enableZoom, plugins, etc.
        />
      )}
    </div>
  );
}
