import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import PhotosPage from "./components/PhotosPage";
import SocialIcons from "./Footer/SocialIcons";
import VideoSection from "./components/VideoSection";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSlider />
              <AboutSection />
              <GallerySection />
              <VideoSection />
            </>
          }
        />
        <Route path="/:category" element={<PhotosPage />} />
      </Routes>
      <SocialIcons />
    </>
  );
}

export default App;