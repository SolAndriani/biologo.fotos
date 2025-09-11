import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PhotoGallery({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = photos.map(src => ({ src }));

  return (
    <div className="photo-gallery">
      <div className="gallery-grid">
        {photos.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`photo-${index}`}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
            style={{ cursor: "pointer", maxWidth: "100%", marginBottom: 10 }}
          />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
        />
      )}
    </div>
  );
}
