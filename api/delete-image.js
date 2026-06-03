const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: "Falta el public_id" });
  }

  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};