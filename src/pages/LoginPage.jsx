// src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginRequest } from '../services/authService';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await loginRequest(form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ebf8ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 12, width: 360, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 22, color: '#1a365d' }}>Distribuciones Comerciales</h1>
        <p style={{ margin: '0 0 28px', color: '#718096', fontSize: 14 }}>del Centro S.A.S. — Ingreso al sistema</p>
        {error && <p style={{ background: '#fff5f5', color: '#c53030', padding: '8px 12px', borderRadius: 6, fontSize: 14, marginBottom: 16 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: '#4a5568', fontWeight: 600 }}>Correo electrónico</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required
              style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 12px',
                border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </label>
          <label style={{ display: 'block', marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: '#4a5568', fontWeight: 600 }}>Contraseña</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} required
              style={{ display: 'block', width: '100%', marginTop: 4, padding: '8px 12px',
                border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
          </label>
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '10px 0', background: '#2b6cb0', color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer',
              opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
