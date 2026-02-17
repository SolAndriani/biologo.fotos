import React, { useState } from "react";
import Masonry from "react-masonry-css";
import ImageModal from "./ImageModal";
import "./PhotoGallery.css";

export default function PhotoGallery({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!photos || photos.length === 0)
    return <p className="no-photos">No hay fotos en esta categoría.</p>;

  const breakpointColumnsObj = { default: 4, 1100: 3, 700: 2, 500: 1 };

  return (
    <div className="photo-gallery">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {photos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`photo-${index}`}
            className="gallery-thumb"
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          />
        ))}
      </Masonry>

      {isOpen && (
        <ImageModal
          photos={photos}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
