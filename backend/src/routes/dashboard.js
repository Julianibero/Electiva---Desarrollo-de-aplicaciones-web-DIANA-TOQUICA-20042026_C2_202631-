// src/routes/dashboard.js
const router = require('express').Router();
const ctrl = require('../controllers/dashboardController');
const { authMiddleware, authorize } = require('../middlewares/auth');

router.use(authMiddleware);

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Indicadores clave del día para el dashboard
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Estadísticas del sistema
 */
router.get('/stats', ctrl.getStats);

/**
 * @swagger
 * /reports/summary:
 *   get:
 *     summary: Reporte gerencial consolidado (solo admin y director)
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Resumen de ventas y productos
 *       403:
 *         description: Sin permisos suficientes
 */
router.get('/reports/summary', authorize('admin', 'director'), ctrl.getReportSummary);

module.exports = router;
