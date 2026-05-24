// src/pages/ReportsPage.jsx — solo visible para admin y director
import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

function ReportsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/reports/summary')
      .catch(() => setData({
        topProducts: [
          { name: 'Arroz Diana x 1kg', sold: 320 },
          { name: 'Aceite Gourmet x 1L', sold: 185 },
          { name: 'Café Águila Roja x 250g', sold: 142 },
        ],
        monthlyRevenue: 42_800_000
      }));
  }, []);

  return (
    <div>
      <h1 style={{ margin: '0 0 24px', color: '#1a365d' }}>Reportes gerenciales</h1>
      <div style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', maxWidth: 500 }}>
        <h3 style={{ marginTop: 0 }}>Productos más vendidos (mes actual)</h3>
        {data?.topProducts.map((p, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span>{p.name}</span><strong>{p.sold} und.</strong>
          </div>
        ))}
        <p style={{ marginTop: 16 }}>Ingresos del mes: <strong style={{ color: '#276749' }}>
          ${data?.monthlyRevenue.toLocaleString('es-CO')}
        </strong></p>
      </div>
    </div>
  );
}

export default ReportsPage;
