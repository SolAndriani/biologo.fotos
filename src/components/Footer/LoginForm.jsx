import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

export default function LoginForm({ onLoginSuccess, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, { username, password });

      if (res.data?.user) {
        setError("");
        if (onLoginSuccess) onLoginSuccess(res.data.user);
        alert(`¡Bienvenido ${res.data.user.username}!`);
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Error en login:", err);
      if (err.response && err.response.status === 401) {
        setError(err.response.data.msg || "Usuario o contraseña incorrectos");
      } else {
        setError("No se pudo conectar con el servidor");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-form" onSubmit={handleSubmit}>
        <span className="modal-close" onClick={onClose}>×</span>
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
          autoComplete="current-password"
        />
        <button type="submit">Ingresar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
