import React from "react";
import "./ImageModal.css";

export default function ImageModal({ photos, photoIndex, setPhotoIndex, onClose }) {
  if (!photos || photos.length === 0) return null;

  const prevPhoto = () => setPhotoIndex((photoIndex + photos.length - 1) % photos.length);
  const nextPhoto = () => setPhotoIndex((photoIndex + 1) % photos.length);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="close-btn" onClick={onClose}>×</button>
      <button className="nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); prevPhoto(); }}>‹</button>
      <img
        src={photos[photoIndex]}
        alt={`photo-${photoIndex}`}
        className="modal-image"
        onClick={(e) => e.stopPropagation()}
      />
      <button className="nav-btn next-btn" onClick={(e) => { e.stopPropagation(); nextPhoto(); }}>›</button>
    </div>
  );
}
