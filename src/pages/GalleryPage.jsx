import React, { useState } from "react";
import UploadForm from "../Footer/UploadForm";
import AnimalesGallery from "./AnimalesGallery";
import BlackAndWhiteGallery from "./BlackAndWhiteGallery";
import PaisajesGallery from "./PaisajesGallery";
import "./PhotosPage.css"; 

export default function GalleryPage() {
  const [refreshAnimales, setRefreshAnimales] = useState(0);
  const [refreshBW, setRefreshBW] = useState(0);
  const [refreshPaisajes, setRefreshPaisajes] = useState(0);

  const handleUploadSuccess = (category) => {
    if (category === "Animales") setRefreshAnimales((prev) => prev + 1);
    else if (category === "BlackAndWhite") setRefreshBW((prev) => prev + 1);
    else if (category === "Paisajes") setRefreshPaisajes((prev) => prev + 1);
  };

  return (
    <div className="gallery-page">
      <UploadForm onUploadSuccess={handleUploadSuccess} />

      <section>
          <h2>Animales</h2> 
        <AnimalesGallery refresh={refreshAnimales} category="animales" />
      </section>

      <section>
        <h2>Blanco y Negro</h2>
        <BlackAndWhiteGallery refresh={refreshBW} category="blackandwhite" />
      </section>

      <section>
        <h2>Paisajes</h2>
        <PaisajesGallery refresh={refreshPaisajes} category="paisajes" />
      </section>
    </div>
  );
}
