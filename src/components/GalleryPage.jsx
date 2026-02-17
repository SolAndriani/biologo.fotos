import React from "react";
import UploadForm from "../Footer/UploadForm";
import Gallery from "./Gallery";

export default function GalleryPage() {
  return (
    <div>
      <UploadForm />
      
      <h2>Animales</h2>
      <Gallery category="animales" />

      <h2>Blanco y Negro</h2>
      <Gallery category="blackandwhite" />

      <h2>Paisajes</h2>
      <Gallery category="paisajes" />
    </div>
  );
}