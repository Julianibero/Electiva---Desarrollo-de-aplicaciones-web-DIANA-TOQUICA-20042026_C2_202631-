// src/middlewares/errorHandler.js
// Middleware global de manejo de errores
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.path} —`, err.message);

  const status = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Error interno del servidor.';

  res.status(status).json({ message, code: err.code || 'SERVER_ERROR' });
}

module.exports = errorHandler;
