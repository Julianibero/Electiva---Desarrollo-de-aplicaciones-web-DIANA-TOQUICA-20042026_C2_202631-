// src/components/shared/Layout.jsx
import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: '📊 Dashboard' },
  { to: '/inventory', label: '📦 Inventario' },
  { to: '/sales',     label: '🛒 Ventas' },
  { to: '/reports',   label: '📈 Reportes' },
];

function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <nav style={{ width: 220, background: '#1a365d', color: '#fff', padding: '24px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 24px 24px', borderBottom: '1px solid #2d5a8e' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>Distribuciones</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#90cdf4' }}>Comerciales del Centro</p>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', flex: 1 }}>
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} style={({ isActive }) => ({
                display: 'block', padding: '10px 24px', color: isActive ? '#fff' : '#bee3f8',
                background: isActive ? '#2b6cb0' : 'transparent',
                textDecoration: 'none', fontSize: 14, fontWeight: isActive ? 700 : 400,
                transition: 'background .15s'
              })}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #2d5a8e' }}>
          <p style={{ margin: '0 0 4px', fontSize: 13, color: '#90cdf4' }}>{user?.name}</p>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: '#718096' }}>{user?.role}</p>
          <button onClick={handleLogout}
            style={{ width: '100%', padding: '8px 0', background: '#e53e3e', color: '#fff',
              border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, background: '#f7fafc', padding: 32, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
