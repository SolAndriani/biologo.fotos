
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import "./PhotoGallery.css";

export default function PhotoGallery({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!photos || photos.length === 0)
    return <p className="no-photos">No hay fotos en esta categoría.</p>;

  const breakpointColumnsObj = { default: 4, 1100: 3, 700: 2, 500: 1 };

  const prevImage = () =>
    setPhotoIndex((photoIndex + photos.length - 1) % photos.length);
  const nextImage = () =>
    setPhotoIndex((photoIndex + 1) % photos.length);

  return (
    <div className="photo-gallery">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`photo-${index}`}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
            className="gallery-thumb"
          />
        ))}
      </Masonry>

      {isOpen && (
        <div className="gallery-overlay" onClick={() => setIsOpen(false)}>
          <button
            className="gallery-close"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            {"✕"}
          </button>
          <button
            className="gallery-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            {"<"} {/* Reemplazo React-friendly */}
          </button>
          <img
            src={photos[photoIndex]}
            alt={`photo-${photoIndex}`}
            className="gallery-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="gallery-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            {">"} {/* Reemplazo React-friendly */}
          </button>
        </div>
      )}
    </div>
  );
}