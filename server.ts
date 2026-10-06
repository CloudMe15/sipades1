import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Middleware
app.use(express.json());
app.use(express.static(distPath));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'SIPADES Desa Sukamaju',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// SPA fallback: any other request serves index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[SIPADES] Server berjalan di port ${PORT}`);
});
