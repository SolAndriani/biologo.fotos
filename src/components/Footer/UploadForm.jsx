import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("animales"); // galería por defecto
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Selecciona una foto");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("category", category);

    try {
      setLoading(true);
      await axios.post(`${backendUrl}/api/photos/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      onUploadSuccess(category);
    } catch (err) {
      console.error(err);
      setError("Error subiendo la foto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Seleccionar galería:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="animales">Animales</option>
          <option value="paisajes">Paisajes</option>
          <option value="blackandwhite">Blanco y Negro</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="photo">Seleccionar foto:</label>
        <input type="file" id="photo" accept="image/*" onChange={handleFileChange} />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Subiendo..." : "Subir foto"}
      </button>
    </form>
  );
}

