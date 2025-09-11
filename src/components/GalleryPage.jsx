import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import AnimalesGallery from "./AnimalesGallery";
import BlackAndWhiteGallery from "./BlackAndWhiteGallery";
import PaisajesGallery from "./PaisajesGallery";

export default function GalleryPage() {
  const [refreshAnimales, setRefreshAnimales] = useState(0);
  const [refreshBW, setRefreshBW] = useState(0);
  const [refreshPaisajes, setRefreshPaisajes] = useState(0);

  const handleUploadSuccess = (category) => {
    if (category === "Animales") setRefreshAnimales(prev => prev + 1);
    else if (category === "BlackAndWhite") setRefreshBW(prev => prev + 1);
    else if (category === "Paisajes") setRefreshPaisajes(prev => prev + 1);
  };

  return (
    <div>
      <UploadForm onUploadSuccess={handleUploadSuccess} />

      <h2>Animales</h2>
      <AnimalesGallery refresh={refreshAnimales} category="Animales" />

      <h2>Blanco y Negro</h2>
      <BlackAndWhiteGallery refresh={refreshBW} category="blackandwhite" />

      <h2>Paisajes</h2>
      <PaisajesGallery refresh={refreshPaisajes} category="paisajes" />
    </div>
  );
}
