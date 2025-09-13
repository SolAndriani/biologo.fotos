import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

// React (CRA) usa REACT_APP_*
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export default function LoginForm({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        username,
        password,
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
        setError(err.response.data.message || "Usuario o contraseña incorrectos");
      } else if (err.request) {
        setError("No se pudo conectar con el servidor. Intenta nuevamente.");
      } else {
        setError("Error inesperado. Intenta nuevamente.");
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
