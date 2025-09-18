import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function UploadForm({ categorySelected, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Selecciona un archivo.");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("category", categorySelected);

    try {
      setLoading(true);
      setError("");
      await axios.post(`${backendUrl}/api/photos/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      onUploadSuccess(); // recarga las fotos
    } catch (err) {
      console.error(err);
      setError("Error subiendo la foto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Subiendo..." : "Subir foto"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
