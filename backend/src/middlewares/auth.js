// src/middlewares/auth.js
// Middleware de autenticación: verifica el JWT en cada petición protegida
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token de autenticación requerido.',
      code: 'TOKEN_MISSING',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = decoded;
    next();
  } catch (err) {
    const code = err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID';
    return res.status(401).json({ message: 'Token inválido o expirado.', code });
  }
}

// Middleware de autorización por rol
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        message: 'No tienes permisos para realizar esta acción.',
        code: 'FORBIDDEN',
      });
    }
    next();
  };
}

module.exports = { authMiddleware, authorize };
