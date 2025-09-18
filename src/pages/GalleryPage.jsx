import React from "react";
import UploadForm from "../Footer/UploadForm";
import AnimalesGallery from "./AnimalesGallery";
import BlackAndWhiteGallery from "./BlackAndWhiteGallery";
import PaisajesGallery from "./PaisajesGallery";
import "./PhotosPage.css"; 

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <UploadForm /> 

      <section>
        <h2>Animales</h2> 
        <AnimalesGallery />
      </section>

      <section>
        <h2>Blanco y Negro</h2>
        <BlackAndWhiteGallery />
      </section>

      <section>
        <h2>Paisajes</h2>
        <PaisajesGallery />
      </section>
    </div>
  );
}
