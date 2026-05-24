// src/controllers/salesController.js
const pool = require('../config/database');

let MOCK_SALES = [
  { id:1, seller_id:2, seller_name:'María López',   total:28500, status:'completada', created_at:'2026-05-22T10:30:00Z', items:[{product_id:1,product_name:'Arroz Diana x 1 kg',qty:3,unit_price:4200,subtotal:12600},{product_id:5,product_name:'Leche Alpina x 1 L',qty:4,unit_price:3600,subtotal:14400}] },
  { id:2, seller_id:1, seller_name:'Julian Vega',   total:67200, status:'completada', created_at:'2026-05-22T14:15:00Z', items:[{product_id:6,product_name:'Café Águila Roja x 250 g',qty:2,unit_price:12900,subtotal:25800},{product_id:2,product_name:'Aceite Gourmet x 1 L',qty:2,unit_price:18500,subtotal:37000}] },
  { id:3, seller_id:2, seller_name:'María López',   total:14800, status:'completada', created_at:'2026-05-23T09:00:00Z', items:[{product_id:9,product_name:'Pasta Doria x 500 g',qty:2,unit_price:3100,subtotal:6200},{product_id:11,product_name:'Sal Refisal x 1 kg',qty:2,unit_price:1800,subtotal:3600}] },
  { id:4, seller_id:3, seller_name:'Carlos Ruiz',   total:41300, status:'completada', created_at:'2026-05-23T11:45:00Z', items:[{product_id:7,product_name:'Jabón Protex x 120 g',qty:5,unit_price:3200,subtotal:16000},{product_id:8,product_name:'Detergente Ariel x 2 kg',qty:1,unit_price:22000,subtotal:22000}] },
  { id:5, seller_id:1, seller_name:'Julian Vega',   total:88100, status:'completada', created_at:'2026-05-24T08:30:00Z', items:[{product_id:2,product_name:'Aceite Gourmet x 1 L',qty:3,unit_price:18500,subtotal:55500},{product_id:3,product_name:'Azúcar Manuelita x 1 kg',qty:5,unit_price:3800,subtotal:19000}] },
];
let nextSaleId = 6;

async function getAll(req, res, next) {
  try {
    const { date, seller_id, status } = req.query;
    let sales = [...MOCK_SALES];
    if (date)      sales = sales.filter(s => s.created_at.startsWith(date));
    if (seller_id) sales = sales.filter(s => s.seller_id === parseInt(seller_id));
    if (status)    sales = sales.filter(s => s.status === status);
    res.json(sales);
  } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try {
    const sale = MOCK_SALES.find(s => s.id === parseInt(req.params.id));
    if (!sale) return res.status(404).json({ message: 'Venta no encontrada.', code: 'NOT_FOUND' });
    res.json(sale);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'La venta debe tener al menos un ítem.', code: 'VALIDATION_ERROR' });
    }

    const total = items.reduce((sum, item) => sum + (item.qty * (item.unit_price || 0)), 0);
    const newSale = {
      id: nextSaleId++,
      seller_id: req.user.id,
      seller_name: req.user.name,
      total,
      status: 'completada',
      created_at: new Date().toISOString(),
      items: items.map(item => ({
        product_id:   item.product_id,
        product_name: item.product_name || `Producto #${item.product_id}`,
        qty:          item.qty,
        unit_price:   item.unit_price || 0,
        subtotal:     item.qty * (item.unit_price || 0),
      })),
    };
    MOCK_SALES.push(newSale);
    res.status(201).json(newSale);
  } catch (err) { next(err); }
}

module.exports = { getAll, getOne, create };
