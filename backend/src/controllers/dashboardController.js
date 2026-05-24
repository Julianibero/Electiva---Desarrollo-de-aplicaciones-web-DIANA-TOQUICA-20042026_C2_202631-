// src/controllers/dashboardController.js

async function getStats(req, res, next) {
  try {
    // En producción estas cifras vendrían de consultas SQL a PostgreSQL
    res.json({
      products:     10,
      lowStock:     4,
      salesToday:   2,
      revenueToday: 88100,
      totalRevenue: 239900,
    });
  } catch (err) { next(err); }
}

async function getReportSummary(req, res, next) {
  try {
    res.json({
      topProducts: [
        { name: 'Aceite Gourmet x 1 L',     sold: 185 },
        { name: 'Arroz Diana x 1 kg',        sold: 142 },
        { name: 'Café Águila Roja x 250 g',  sold: 98  },
        { name: 'Azúcar Manuelita x 1 kg',   sold: 76  },
        { name: 'Leche Alpina x 1 L',        sold: 64  },
      ],
      monthlyRevenue: 42800000,
      revenueByDay: {
        '2026-05-22': 95700,
        '2026-05-23': 56100,
        '2026-05-24': 88100,
      },
    });
  } catch (err) { next(err); }
}

module.exports = { getStats, getReportSummary };
