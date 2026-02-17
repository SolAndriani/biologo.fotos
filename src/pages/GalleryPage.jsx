import React from "react";
import UploadForm from "../Footer/UploadForm";
import PhotoGallery from "../components/PhotoGallery";
import "./GalleryPage.css";

import animalesPhotos from "../data/animales";
import bwPhotos from "../data/blackandwhite";
import paisajesPhotos from "../data/paisajes";

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      
      <UploadForm />

      <section>
        <h2 className="gallery-title">Animales</h2>
        <PhotoGallery photos={animalesPhotos} />
      </section>

      <section>
        <h2 className="gallery-title">Blanco y Negro</h2>
        <PhotoGallery photos={bwPhotos} />
      </section>

      <section>
        <h2 className="gallery-title">Paisajes</h2>
        <PhotoGallery photos={paisajesPhotos} />
      </section>

    </div>
  );
}
