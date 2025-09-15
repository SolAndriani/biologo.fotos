import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import "./SocialIcons.css";

export default function SocialIcons() {
  return (
    <div className="social-icons">
      <a
        href="https://www.instagram.com/agustinthewild/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram size={24} />
      </a>
      <a
        href="https://x.com/Agustinthewild?t=igjDBxkw28LRyo2cl4Bm1g&s=08"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href="https://www.tiktok.com/@kaliagus?_t=ZN-8zbzLCNhg0M&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <FaTiktok size={24} />
      </a>
    </div>
  );
}
