import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoGallery from "./PhotoGallery";
import "./PhotoGallery.css";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const CATEGORY_MAP = {
  animales: "animales",
  paisajes: "paisajes",
  "black-and-white": "blanco-y-negro",
};

async function fetchPhotosByTag(tag) {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.resources.map(
    (r) =>
      `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${r.public_id}.${r.format}`
  );
}

export default function PhotosPage() {
  const { category } = useParams();
  const tag = CATEGORY_MAP[category?.toLowerCase()] || category?.toLowerCase();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tag) return;
    setLoading(true);
    fetchPhotosByTag(tag).then((imgs) => {
      setPhotos(imgs);
      setLoading(false);
    });
  }, [tag]);

  if (loading) {
    return (
      <div className="photos-page">
        <p className="photos-message">Cargando fotos...</p>
      </div>
    );
  }

  return (
    <div className="photos-page">
      {photos.length === 0 ? (
        <p className="photos-message">No hay fotos disponibles.</p>
      ) : (
        <PhotoGallery photos={photos} />
      )}
    </div>
  );
}