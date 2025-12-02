import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import Footer from "./components/Footer/Footer";
import PhotosPage from "./components/PhotosPage";
import ImageModal from "./components/ImageModal";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [photosUpdated, setPhotosUpdated] = useState(false);

  const handleLoginSuccess = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
  };

  const refreshPhotos = () => {
    setPhotosUpdated(prev => !prev); 
  };

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
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      <Footer
        loggedUser={loggedUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onUploadSuccess={refreshPhotos} 
      />
    </>
  );
}

export default App;