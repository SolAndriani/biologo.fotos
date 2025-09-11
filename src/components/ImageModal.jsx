import React from "react";
import "./ImageModal.css";

export default function ImageModal({ photos, photoIndex, setPhotoIndex, onClose }) {
  if (!photos || photos.length === 0) return null;

  const prevPhoto = () => {
    setPhotoIndex((photoIndex + photos.length - 1) % photos.length);
  };

  const nextPhoto = () => {
    setPhotoIndex((photoIndex + 1) % photos.length);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <button className="nav-btn prev-btn" onClick={prevPhoto}>&lt;</button>
        <img src={photos[photoIndex]} alt={`photo-${photoIndex}`} />
        <button className="nav-btn next-btn" onClick={nextPhoto}>&gt;</button>
      </div>
    </div>
  );
}
