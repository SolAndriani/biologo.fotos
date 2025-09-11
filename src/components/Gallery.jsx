import React, { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo || !category) return setMessage("Archivo y categoría son obligatorios");

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("category", category);

    try {
      const res = await axios.post("http://localhost:4000/api/photos/upload", formData);
      setMessage(`Foto subida: ${res.data.url}`);
    } catch (err) {
      setMessage("Error subiendo la foto");
    }
  };

  return (
    <div>
      <h3>Subir Foto</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Subir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
