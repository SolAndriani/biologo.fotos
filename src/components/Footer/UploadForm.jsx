import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("paisajes");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("Selecciona un archivo primero.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("category", category);

    try {
const res = await axios.post("http://localhost:4000/api/photos/upload", formData);
      console.log("Foto subida:", res.data);
      setMessage("Foto subida correctamente!");
      setSelectedFile(null);
    } catch (err) {
      console.error("Error subiendo foto:", err);
      setMessage("Error al subir la foto.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      <select value={category} onChange={handleCategoryChange}>
        <option value="paisajes">Paisajes</option>
        <option value="animales">Animales</option>
        <option value="blackandwhite">Blanco y negro</option>
      </select>

      <button type="submit">Subir foto</button>
      {message && <p>{message}</p>}
    </form>
  );
}
