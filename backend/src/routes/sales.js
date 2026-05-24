// src/routes/sales.js
const router = require('express').Router();
const ctrl = require('../controllers/salesController');
const { authMiddleware } = require('../middlewares/auth');

router.use(authMiddleware);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Listar ventas registradas
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *         description: Filtrar por fecha (YYYY-MM-DD)
 *       - in: query
 *         name: seller_id
 *         schema: { type: integer }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [completada, anulada] }
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Obtener detalle de una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detalle de la venta con sus ítems
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Venta no encontrada
 */
router.get('/:id', ctrl.getOne);

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Registrar una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleInput'
 *     responses:
 *       201:
 *         description: Venta registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', ctrl.create);

module.exports = router;
