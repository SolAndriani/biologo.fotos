import React from "react";

export default function Gallery({ photos }) {
  return (
    <div className="photos-container">
      {photos.map((photo) => (
        <img
          key={photo._id}
          src={photo.fullUrl}
          alt={photo.category}
        />
      ))}
    </div>
  );
}
