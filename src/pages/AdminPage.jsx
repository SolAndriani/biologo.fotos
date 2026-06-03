import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./AdminPage.css";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dbkpfcqqp";
const UPLOAD_PRESET = "kalinowski_upload";

const CATEGORIAS = [
  { label: "Slider", tag: "slider", folder: "slider" },
  { label: "Animales", tag: "animales", folder: "animales" },
  { label: "Paisajes", tag: "paisajes", folder: "paisajes" },
  { label: "Blanco y Negro", tag: "blanco-y-negro", folder: "blanco-y-negro" },
  { label: "Videos", tag: "videos", folder: "videos" },
];

async function fetchFotos(tag) {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.resources.map((r) => ({
    url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_300,h_200,c_fill/${r.public_id}.${r.format}`,
    public_id: r.public_id,
  }));
}

async function eliminarFoto(public_id) {
  const res = await fetch("/api/delete-image", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id }),
  });
  return res.ok;
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [archivos, setArchivos] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [subidos, setSubidos] = useState(0);
  const [fotos, setFotos] = useState([]);
  const [cargandoFotos, setCargandoFotos] = useState(false);

  useEffect(() => {
    if (!user) return;
    setCargandoFotos(true);
    fetchFotos(categoria.tag).then((imgs) => {
      setFotos(imgs);
      setCargandoFotos(false);
    });
  }, [user, categoria]);

  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setError("");
    } catch {
      setError("Email o contraseña incorrectos");
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  const subirArchivos = async () => {
    if (archivos.length === 0) return;
    setSubiendo(true);
    setSubidos(0);

    const esVideo = categoria.folder === "videos";

    for (let i = 0; i < archivos.length; i++) {
      const formData = new FormData();
      formData.append("file", archivos[i]);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", categoria.folder);
      formData.append("tags", categoria.tag);

      const tipo = esVideo ? "video" : "image";
      await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${tipo}/upload`, {
        method: "POST",
        body: formData,
      });

      setSubidos(i + 1);
    }

    setSubiendo(false);
    setArchivos([]);
    fetchFotos(categoria.tag).then((imgs) => setFotos(imgs));
    alert(`✅ ${archivos.length} archivo${archivos.length > 1 ? "s subidos" : " subido"} correctamente`);
  };

  const handleEliminar = async (public_id) => {
    if (!window.confirm("¿Seguro que querés eliminar esta foto?")) return;
    const ok = await eliminarFoto(public_id);
    if (ok) {
      setFotos((prev) => prev.filter((f) => f.public_id !== public_id));
    } else {
      alert("Error al eliminar la foto");
    }
  };

  if (!user) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h1 className="admin-titulo">PANEL ADMIN</h1>
          <p className="admin-subtitulo">Kalinowski Fotografía</p>
          <input
            className="admin-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="admin-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-boton" onClick={login}>Ingresar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-box">
        <div className="admin-header">
          <h1 className="admin-titulo">SUBIR FOTOS</h1>
          <div className="admin-header-botones">
            <a href="/" className="admin-boton-ver">Ver sitio</a>
            <button className="admin-boton-salir" onClick={logout}>Salir</button>
          </div>
        </div>

        <p className="admin-label">Categoría</p>
        <div className="admin-categorias">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.tag}
              className={`admin-cat-boton ${categoria.tag === cat.tag ? "activo" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="admin-label">
          {categoria.folder === "videos" ? "Seleccioná los videos" : "Seleccioná las fotos"}
        </p>
        <input
          className="admin-input-file"
          type="file"
          multiple
          accept={categoria.folder === "videos" ? "video/*" : "image/*"}
          onChange={(e) => setArchivos(Array.from(e.target.files))}
        />

        {archivos.length > 0 && (
          <p className="admin-info">{archivos.length} archivo{archivos.length > 1 ? "s" : ""} seleccionado{archivos.length > 1 ? "s" : ""}</p>
        )}

        {subiendo && (
          <p className="admin-info">Subiendo... {subidos}/{archivos.length}</p>
        )}

        <button
          className={`admin-boton ${archivos.length === 0 || subiendo ? "deshabilitado" : ""}`}
          onClick={subirArchivos}
          disabled={archivos.length === 0 || subiendo}
        >
          {subiendo ? "Subiendo..." : "Subir"}
        </button>

        <p className="admin-label" style={{ marginTop: "2.5rem" }}>
          Fotos en {categoria.label} ({fotos.length})
        </p>
        {cargandoFotos ? (
          <p className="admin-info">Cargando...</p>
        ) : (
          <div className="admin-preview-grid">
            {fotos.map((foto, i) => (
              <div key={i} className="admin-preview-item">
                <img src={foto.url} alt={`foto-${i}`} className="admin-preview-img" />
                <button
                  className="admin-eliminar-btn"
                  onClick={() => handleEliminar(foto.public_id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}