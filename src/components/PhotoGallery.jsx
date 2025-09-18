import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./PhotoGallery.css";

export default function PhotoGallery({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!photos || photos.length === 0)
    return <p className="no-photos">No hay fotos en esta categoría.</p>;

  const slides = photos.map((url) => ({ src: url }));

  const breakpointColumnsObj = { default: 4, 1100: 3, 700: 2, 500: 1 };

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
            style={{ cursor: "pointer", width: "100%", marginBottom: 10 }}
          />
        ))}
      </Masonry>

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
