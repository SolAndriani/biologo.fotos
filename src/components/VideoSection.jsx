import { useRef, useEffect } from "react";
import "./VideoSection.css";

const videos = [
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771504070/WhatsApp_Video_2026-02-17_at_22.33.55_2_xyw05h.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771504007/WhatsApp_Video_2026-02-17_at_22.33.46_2_pj72ft.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771359844/WhatsApp_Video_2026-02-17_at_14.18.11_g4xire.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771503987/WhatsApp_Video_2026-02-17_at_22.33.44_1_nvpkf4.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771503914/WhatsApp_Video_2026-02-17_at_22.33.44_bftote.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771503945/WhatsApp_Video_2026-02-17_at_22.33.45_kfkmhu.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771503995/WhatsApp_Video_2026-02-17_at_22.33.46_1_oqtruw.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771503959/WhatsApp_Video_2026-02-17_at_22.33.45_1_aenkxb.mp4",
  "https://res.cloudinary.com/dmixd7wpb/video/upload/v1771359823/WhatsApp_Video_2026-02-17_at_14.18.08_tnnffj.mp4"
];

export default function VideoSection() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let position = 0;
    const speed = 0.5; // velocidad ligeramente más rápida

    const loop = () => {
      position -= speed;
      if (position <= -track.scrollWidth / 2) position = 0;
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  return (
    <section className="video-section">
      <div className="video-track" ref={trackRef}>
        {[...videos, ...videos].map((url, idx) => (
          <div className="video-card" key={idx}>
            <video src={url} muted autoPlay loop playsInline />
          </div>
        ))}
      </div>
    </section>
  );
}
