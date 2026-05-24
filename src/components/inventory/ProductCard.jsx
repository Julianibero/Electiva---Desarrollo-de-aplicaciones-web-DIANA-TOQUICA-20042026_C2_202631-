// src/components/inventory/ProductCard.jsx
// Componente reutilizable: tarjeta de producto con alerta de stock bajo
import React from 'react';

function ProductCard({ product, onEdit, onDelete }) {
  const { id, name, stock, category, price } = product;
  const isLowStock = stock < 10;

  return (
    <div style={{
      border: `2px solid ${isLowStock ? '#e53e3e' : '#e2e8f0'}`,
      borderRadius: 8,
      padding: 16,
      background: '#fff',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: 0, fontSize: 16, color: '#2d3748' }}>{name}</h3>
        <span style={{
          fontSize: 12, padding: '2px 8px', borderRadius: 12,
          background: '#ebf8ff', color: '#2b6cb0', fontWeight: 600
        }}>{category}</span>
      </div>
      <p style={{ margin: '8px 0 4px', color: '#4a5568', fontSize: 14 }}>
        Stock: <strong style={{ color: isLowStock ? '#e53e3e' : '#276749' }}>{stock} und.</strong>
      </p>
      <p style={{ margin: '0 0 12px', fontSize: 14, color: '#4a5568' }}>
        Precio: <strong>${price?.toLocaleString('es-CO')}</strong>
      </p>
      {isLowStock && (
        <p style={{ margin: '0 0 12px', color: '#e53e3e', fontSize: 13, fontWeight: 600 }}>
          ⚠ Stock bajo — solicitar reposición
        </p>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onEdit?.(product)}
          style={{ flex: 1, padding: '6px 0', background: '#3182ce', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          Editar
        </button>
        <button onClick={() => onDelete?.(id)}
          style={{ flex: 1, padding: '6px 0', background: '#fff', color: '#e53e3e', border: '1px solid #e53e3e', borderRadius: 6, cursor: 'pointer' }}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
