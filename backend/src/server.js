// src/server.js
// Punto de entrada del servidor Node.js + Express
require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const swaggerUi    = require('swagger-ui-express');
const swaggerSpec  = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes      = require('./routes/auth');
const productRoutes   = require('./routes/products');
const salesRoutes     = require('./routes/sales');
const dashboardRoutes = require('./routes/dashboard');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://distribuciones.com'
    : ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Logging básico ────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Documentación Swagger ────────────────────────────────────────────
// Acceder en: http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'API Distribuciones Comerciales',
  swaggerOptions: { persistAuthorization: true },
}));

// ── Rutas de la API ───────────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/sales',     salesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports',   dashboardRoutes);

// ── Health check ──────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV || 'development' });
});

// ── 404 handler ───────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada.', code: 'NOT_FOUND' });
});

// ── Error handler global ──────────────────────────────────────────────
app.use(errorHandler);

// ── Arranque ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📖 Swagger UI disponible en http://localhost:${PORT}/api-docs\n`);
});

module.exports = app;
