import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import axios from "axios";
import "./PhotosPage.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export default function PhotosPage({ loggedUser, photosUpdated }) {
  const { category } = useParams();
  const lowerCategory = category?.toLowerCase().replace(/[\s-]/g, "");

  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const loadPhotos = async () => {
    if (!lowerCategory) return;
    try {
      const res = await axios.get(
        `${backendUrl}/api/photos/category/${lowerCategory}`
      );
      setPhotos(res.data.photos.map((url) => `${backendUrl}${url}`));
    } catch (err) {
      console.error("Error cargando fotos:", err);
      setPhotos([]);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [lowerCategory, photosUpdated]);

  return (
    <div className="photos-page">
      {photos.length > 0 ? (
        <div className="gallery-grid">
          {photos.map((foto, index) => (
            <div key={index} className="gallery-item">
              <img
                src={foto}
                alt={`${lowerCategory}-${index}`}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-photos">No hay fotos en esta categoría.</p>
      )}

      {isOpen && (
        <Lightbox
          mainSrc={photos[photoIndex]}
          nextSrc={photos[(photoIndex + 1) % photos.length]}
          prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % photos.length)
          }
          enableZoom={false}
          imagePadding={0}
          toolbarButtons={[]}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          reactModalStyle={{
            overlay: { backgroundColor: "rgba(0,0,0,0.85)" },
            content: {
              border: "none",
              background: "transparent",
              padding: 0,
              inset: 0,
            },
          }}
        />
      )}
    </div>
  );
}
