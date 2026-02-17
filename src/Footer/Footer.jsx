import React from "react";
import SocialIcons from "./SocialIcons";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div id="contacto">
        <SocialIcons />
      </div>

      <p className="footer-copy">
        © 2025{" "}
        <span className="admin-link">
          Agustín Kalinowski
        </span>
      </p>
    </footer>
  );
}
