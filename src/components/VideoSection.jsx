import { useRef, useEffect, useState } from "react";
import "./VideoSection.css";

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

async function fetchVideos() {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/video/list/videos.json`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.resources.map(
    (r) => `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${r.public_id}.${r.format}`
  );
}

export default function VideoSection() {
  const trackRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos().then((vids) => setVideos(vids));
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;
    const track = trackRef.current;
    let position = 0;
    const speed = 0.5;

    const loop = () => {
      position -= speed;
      if (position <= -track.scrollWidth / 3) position = 0;
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(loop);
    };

    loop();
  }, [videos]);

  if (videos.length === 0) return null;

  return (
    <section className="video-section">
      <div className="video-track" ref={trackRef}>
        {[...videos, ...videos, ...videos].map((url, idx) => (
          <div className="video-card" key={idx}>
            <video src={url} muted autoPlay loop playsInline />
          </div>
        ))}
      </div>
    </section>
  );
}