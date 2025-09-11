import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      backgroundColor: 'rgba(255, 243, 243, 0.12)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0)',
      zIndex: 999,
      fontFamily: "'Georgia', serif",
      fontWeight: '60',
      fontSize: '1.5rem',
      color: '#rgba',
      userSelect: 'none'
    }}>
      <div>Agustín Kalinowski</div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '2rem' }}>
        <a href="#gallery" style={{ color: '#rgba', textDecoration: 'none' }}>Galería</a>
        <a href="#upload" style={{ color: '#rgba', textDecoration: 'none' }}>Subir</a>
      </div>
    </nav>
  );
}
