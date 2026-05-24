// src/controllers/authController.js
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const pool    = require('../config/database');

// Usuarios mock para demostración (en producción se consulta la BD)
const MOCK_USERS = [
  { id: 1, name: 'Julian Vega Joya', email: 'admin@distribuciones.co',   password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'admin' },
  { id: 2, name: 'María López',      email: 'ventas@distribuciones.co',  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'vendedor' },
  { id: 3, name: 'Carlos Ruiz',      email: 'bodega@distribuciones.co',  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'bodega' },
];
// Contraseña de todos: "password" (hash bcrypt)

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos.', code: 'VALIDATION_ERROR' });
    }

    // En producción: const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.', code: 'INVALID_CREDENTIALS' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciales incorrectas.', code: 'INVALID_CREDENTIALS' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    const { password: _, ...userSafe } = user;
    res.json({ token, user: userSafe });

  } catch (err) {
    next(err);
  }
}

async function logout(req, res) {
  // Con JWT stateless el logout es del lado del cliente (eliminar el token)
  // En producción se puede usar una blacklist en Redis
  res.json({ message: 'Sesión cerrada correctamente.' });
}

async function me(req, res) {
  const { password: _, ...userSafe } = req.user;
  res.json(userSafe);
}

module.exports = { login, logout, me };
