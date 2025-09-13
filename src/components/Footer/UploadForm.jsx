import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

// URL del backend desde variable de entorno o localhost como fallback
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

const UploadForm = ({ categorySelected, onUploadSuccess }) => {
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState(categorySelected || "");
  const [message, setMessage] = useState("");

  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) return setMessage("Por favor selecciona una foto.");
    if (!category) return setMessage("Por favor selecciona una categoría.");

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("category", category);

    try {
      const res = await axios.post(`${backendUrl}/api/photos/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // útil si usas cookies
      });

      const uploadedPhotoUrl = res.data.photoUrl;

      setMessage("Foto subida correctamente!");
      setPhoto(null);

      if (onUploadSuccess) onUploadSuccess(uploadedPhotoUrl);
    } catch (error) {
      console.error("Error subiendo la foto:", error);

      if (error.response) {
        // Error devuelto por el backend
        setMessage(error.response.data.message || `Error: ${error.response.status}`);
      } else if (error.request) {
        // No hubo respuesta del backend
        setMessage("No se pudo conectar con el servidor. Revisa la URL y CORS.");
      } else {
        // Otro error inesperado
        setMessage(`Error inesperado: ${error.message}`);
      }
    }
  };

  return (
    <div className="upload-form">
      <h2>Subir foto</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handlePhotoChange} />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Selecciona categoría</option>
          <option value="animales">Animales</option>
          <option value="blackandwhite">Blanco y Negro</option>
          <option value="paisajes">Paisajes</option>
        </select>
        <button type="submit">Subir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
