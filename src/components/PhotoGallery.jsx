import React, { useState } from "react";
import Masonry from "react-masonry-css";
import ImageModal from "./ImageModal";
import "./PhotoGallery.css";

export default function PhotoGallery({ photos, loadMore }) {
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
        {photos.map((url, index) => {
          // Genera thumbnail solo si el URL tiene "/upload/"
          const thumbUrl = url.includes("/upload/")
            ? url.replace("/upload/", "/upload/w_400,h_300,c_fill/")
            : url;

          return (
            <img
              key={index}
              src={thumbUrl}
              alt={`photo-${index}`}
              className="gallery-thumb"
              loading="lazy"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
          );
        })}
      </Masonry>

      {loadMore && photos.length > 0 && (
        <button className="load-more-btn" onClick={loadMore}>
          Cargar más
        </button>
      )}

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
