import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import UploadForm from "./UploadForm";
import SocialIcons from "./SocialIcons";
import "./Footer.css";

export default function Footer() {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [showUpload, setShowUpload] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (loggedIn) setShowUpload(true);
  }, [loggedIn]);

  const handleClick = () => {
    if (!loggedIn) setShowLogin(true);
    else setShowUpload((prev) => !prev);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", true);
    setShowLogin(false);
    setShowUpload(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    setShowUpload(false);
  };

  const handleUploadSuccess = (newPhotoUrl) => {
    if (newPhotoUrl) setPhotos((prev) => [newPhotoUrl, ...prev]);
  };

  return (
    <>
      <footer>
        {/* Contenedor para scroll hacia Contacto */}
        <div id="contacto">
          <SocialIcons />
        </div>

        <p className="footer-copy">
          © 2025{" "}
          <span className="admin-link" onClick={handleClick}>
            Agustín Kalinowski
          </span>
        </p>

        {loggedIn && showUpload && (
          <div className="upload-container">
            <UploadForm
              categorySelected=""
              onUploadSuccess={handleUploadSuccess}
            />
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}

        {photos.length > 0 && (
          <div className="photo-list">
            {photos.map((url, index) => (
              <img key={index} src={url} alt={`subida-${index}`} />
            ))}
          </div>
        )}
      </footer>

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
