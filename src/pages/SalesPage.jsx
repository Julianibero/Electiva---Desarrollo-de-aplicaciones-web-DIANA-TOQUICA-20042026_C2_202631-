// src/pages/SalesPage.jsx
import SaleForm from '../components/sales/SaleForm';

function SalesPage() {
  return (
    <div>
      <h1 style={{ margin: '0 0 24px', color: '#1a365d' }}>Registrar venta</h1>
      <SaleForm onSaleCreated={() => alert('Venta registrada exitosamente.')} />
    </div>
  );
}

export default SalesPage;
