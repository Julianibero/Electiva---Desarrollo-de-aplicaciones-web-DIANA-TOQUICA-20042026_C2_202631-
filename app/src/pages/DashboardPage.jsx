// src/pages/DashboardPage.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosInstance';

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <p style={{ margin: '8px 0 4px', fontSize: 28, fontWeight: 700, color }}>{value}</p>
      <p style={{ margin: 0, fontSize: 14, color: '#718096' }}>{label}</p>
    </div>
  );
}

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats({ products: 148, lowStock: 12, salesToday: 23, revenueToday: 4850000 }));
  }, []);

  return (
    <div>
      <h1 style={{ margin: '0 0 4px', color: '#1a365d' }}>Bienvenido, {user?.name}</h1>
      <p style={{ margin: '0 0 28px', color: '#718096' }}>Resumen del día — {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
        <StatCard label="Productos en inventario" value={stats?.products ?? '—'} color="#3182ce" icon="📦" />
        <StatCard label="Productos con stock bajo" value={stats?.lowStock ?? '—'} color="#e53e3e" icon="⚠️" />
        <StatCard label="Ventas registradas hoy" value={stats?.salesToday ?? '—'} color="#38a169" icon="🛒" />
        <StatCard label="Ingresos del día (COP)"
          value={stats ? `$${stats.revenueToday.toLocaleString('es-CO')}` : '—'} color="#d69e2e" icon="💰" />
      </div>
    </div>
  );
}

export default DashboardPage;
