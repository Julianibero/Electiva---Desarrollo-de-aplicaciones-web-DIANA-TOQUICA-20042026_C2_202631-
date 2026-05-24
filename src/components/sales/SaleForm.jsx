// src/components/sales/SaleForm.jsx
// Demuestra los 4 hooks: useState, useEffect, useContext, useReducer
import { useState, useEffect, useContext, useReducer } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getProducts } from '../../services/inventoryService';
import { createSale } from '../../services/salesService';

// useReducer: manejo del carrito de ventas
const initialCart = { items: [], total: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists
        ? state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.payload, qty: 1 }];
      return { items, total: items.reduce((s, i) => s + i.price * i.qty, 0) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { items, total: items.reduce((s, i) => s + i.price * i.qty, 0) };
    }
    case 'CLEAR':
      return initialCart;
    default:
      return state;
  }
}

function SaleForm({ onSaleCreated }) {
  const { user } = useContext(AuthContext);                        // useContext
  const [cart, dispatch] = useReducer(cartReducer, initialCart);  // useReducer
  const [products, setProducts] = useState([]);                   // useState
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // useEffect: carga productos al montar el componente
  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => setError('No se pudieron cargar los productos.'));
  }, []);

  const handleSubmit = async () => {
    if (cart.items.length === 0) return;
    setSubmitting(true);
    try {
      await createSale({ sellerId: user.id, items: cart.items, total: cart.total });
      dispatch({ type: 'CLEAR' });
      onSaleCreated?.();
    } catch {
      setError('Error al registrar la venta.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
      {/* Catálogo de productos */}
      <div>
        <h3 style={{ marginTop: 0 }}>Productos disponibles</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
          {products.map(p => (
            <div key={p.id} onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
              style={{ padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer',
                background: '#f7fafc', transition: 'box-shadow .2s' }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{p.name}</p>
              <p style={{ margin: '4px 0 0', color: '#3182ce', fontSize: 13 }}>${p.price?.toLocaleString('es-CO')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito */}
      <div style={{ background: '#f7fafc', borderRadius: 8, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Resumen de venta</h3>
        <p style={{ fontSize: 13, color: '#718096' }}>Vendedor: {user?.name}</p>
        {cart.items.length === 0
          ? <p style={{ color: '#a0aec0' }}>Selecciona productos del catálogo</p>
          : cart.items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>{item.name} × {item.qty}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>${(item.price * item.qty).toLocaleString('es-CO')}</span>
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}>✕</button>
            </div>
          ))
        }
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
          <span>Total:</span><span>${cart.total.toLocaleString('es-CO')}</span>
        </div>
        <button onClick={handleSubmit} disabled={submitting || cart.items.length === 0}
          style={{ marginTop: 16, width: '100%', padding: '10px 0', background: '#38a169',
            color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
            opacity: (submitting || cart.items.length === 0) ? 0.6 : 1 }}>
          {submitting ? 'Registrando…' : 'Registrar venta'}
        </button>
      </div>
    </div>
  );
}

export default SaleForm;
