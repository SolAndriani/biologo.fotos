import React, { useState } from "react";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function UploadForm({ categorySelected, onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", categorySelected);

    try {
      const res = await axios.post(`${backendUrl}/api/photos/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Confirmar que el backend devuelve 'url' relativa
      const photo = {
        ...res.data,
        fullUrl: `${backendUrl}${res.data.url}`,
      };

      onUploadSuccess(photo); // recarga las fotos en PhotosPage
      setFile(null);
    } catch (err) {
      console.error("Error subiendo foto:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Subir Foto</button>
    </form>
  );
}
