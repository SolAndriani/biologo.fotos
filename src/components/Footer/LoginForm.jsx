import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

// URL del backend desde variable de entorno o localhost como fallback
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export default function LoginForm({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, { username, password }, {
        withCredentials: true, // si usas cookies
      });

      const { user } = res.data;

      if (user) {
        onLoginSuccess(user);
        setError("");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en login:", err);

      if (err.response) {
        // Error devuelto por el backend
        setError(err.response.data.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        // No hubo respuesta del backend
        setError("No se pudo conectar con el servidor. Revisa la URL y CORS.");
      } else {
        // Otro error inesperado
        setError(`Error inesperado: ${err.message}`);
      }
    }
  };

  console.log("Backend URL:", backendUrl);

  return (
    <div className="modal-overlay">
      <form className="modal-form" onSubmit={handleSubmit}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
