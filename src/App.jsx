import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import PhotosPage from "./components/PhotosPage";
import ImageModal from "./components/ImageModal";
import SocialIcons from "./Footer/SocialIcons";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [photosUpdated, setPhotosUpdated] = useState(false);

  return (
    <>
      <Header loggedUser={loggedUser} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSlider />
              <AboutSection />
              <GallerySection onImageClick={setSelectedImage} />
            </>
          }
        />

        <Route
          path="/:category"
          element={
            <PhotosPage
              loggedUser={loggedUser}
              photosUpdated={photosUpdated}
            />
          }
        />
      </Routes>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <SocialIcons />
    </>
  );
}

export default App;
