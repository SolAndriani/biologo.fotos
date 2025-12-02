const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Example in-memory data useful for local dev / tests
const photos = [
  { _id: '1', url: 'https://picsum.photos/id/1011/400/300', title: 'Montañas', category: 'paisajes' },
  { _id: '2', url: 'https://picsum.photos/id/1015/400/300', title: 'Perro', category: 'animales' },
  { _id: '3', url: 'https://picsum.photos/id/1020/400/300', title: 'Gato', category: 'animales' },
  { _id: '4', url: 'https://picsum.photos/id/1023/400/300', title: 'Blanco y negro', category: 'blackandwhite' },
  { _id: '5', url: 'https://picsum.photos/id/103/400/300', title: 'Perfil', category: 'perfil' },
];

app.get('/api/photos/category/:category', (req, res) => {
  const { category } = req.params;
  const filtered = photos.filter((p) => p.category === category);
  // Return empty array if no photos — keep behavior simple for dev
  return res.json(filtered);
});

app.post('/api/photos/upload', (req, res) => {
  // This dev endpoint accepts uploads but doesn't save anything.
  // In your real backend this would accept multipart form data.
  return res.json({ ok: true, msg: 'Mock upload received (dev-only)' });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ msg: 'Username and password are required' });
  }

  // simple demo auth: admin/password -> admin user, username "fail" -> 401
  if (username === 'fail') return res.status(401).json({ msg: 'Invalid credentials' });

  if (username === 'admin' && password === 'password') {
    return res.json({ user: { username: 'admin', name: 'Admin User', role: 'admin' } });
  }

  // Accept other username/password combos for demo purposes
  return res.json({ user: { username, name: username, role: 'user' } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mock backend listening on http://localhost:${PORT}`));
