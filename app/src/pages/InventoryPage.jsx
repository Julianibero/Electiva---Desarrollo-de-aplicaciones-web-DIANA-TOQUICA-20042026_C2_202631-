// src/pages/InventoryPage.jsx
import { useState, useEffect } from 'react';
import ProductCard from '../components/inventory/ProductCard';
import { getProducts, deleteProduct } from '../services/inventoryService';

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    getProducts({ search })
      .then(res => setProducts(res.data))
      .catch(() => setProducts([
        { id: 1, name: 'Arroz Diana x 1kg', stock: 45, category: 'Granos', price: 4200 },
        { id: 2, name: 'Aceite Gourmet x 1L', stock: 7, category: 'Aceites', price: 18500 },
        { id: 3, name: 'Azúcar Manuelita x 1kg', stock: 32, category: 'Dulces', price: 3800 },
        { id: 4, name: 'Harina de trigo x 1kg', stock: 3, category: 'Harinas', price: 5100 },
        { id: 5, name: 'Leche Alpina x 1L', stock: 24, category: 'Lácteos', price: 3600 },
        { id: 6, name: 'Café Águila Roja x 250g', stock: 18, category: 'Bebidas', price: 12900 },
      ]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('¿Confirma eliminar este producto?')) return;
    await deleteProduct(id).catch(() => {});
    setProducts(p => p.filter(x => x.id !== id));
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, color: '#1a365d' }}>Inventario de productos</h1>
        <button style={{ padding: '8px 20px', background: '#2b6cb0', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
          + Nuevo producto
        </button>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nombre o categoría…"
        style={{ width: '100%', maxWidth: 360, padding: '8px 12px', border: '1px solid #e2e8f0',
          borderRadius: 8, fontSize: 14, marginBottom: 24, boxSizing: 'border-box' }} />
      {loading
        ? <p>Cargando productos…</p>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onDelete={handleDelete} />)}
          </div>
        )
      }
    </div>
  );
}

export default InventoryPage;
