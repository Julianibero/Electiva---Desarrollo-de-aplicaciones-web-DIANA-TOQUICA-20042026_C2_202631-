# Distribuciones Comerciales del Centro — App Web

Aplicación web de gestión de inventarios y ventas para Distribuciones Comerciales del Centro S.A.S.  
Desarrollada como parte de la Actividad 4 — Electiva Desarrollo de Aplicaciones Web.

**Autor:** Julian Vega Joya  
**Institución:** Corporación Universitaria Iberoamericana  

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Estado global | Context API + useReducer |
| HTTP | Axios |
| Backend | Node.js + Express.js |
| Base de datos | PostgreSQL 16 |
| Auth | JWT |
| Despliegue | AWS (S3 + CloudFront + EC2 + RDS) |
| CI/CD | GitHub Actions |

---

## Instalación local

### Prerrequisitos
- Node.js 20.x LTS
- npm 10.x

### Frontend
```bash
cd frontend
npm install
cp .env.example .env        # configurar VITE_API_URL
npm run dev                 # http://localhost:5173
```

### Backend
```bash
cd backend
npm install
cp .env.example .env        # configurar DB_URL, JWT_SECRET, PORT
npm run dev                 # http://localhost:3000
```

---

## Estructura del proyecto

```
distribuciones-comerciales-app/
├── frontend/
│   ├── src/
│   │   ├── api/             # axiosInstance.js
│   │   ├── context/         # AuthContext.jsx
│   │   ├── services/        # inventoryService, salesService, authService
│   │   ├── components/
│   │   │   ├── inventory/   # ProductCard.jsx
│   │   │   ├── sales/       # SaleForm.jsx
│   │   │   └── shared/      # Layout.jsx
│   │   ├── pages/           # LoginPage, DashboardPage, InventoryPage, SalesPage, ReportsPage
│   │   ├── App.jsx          # Rutas y navegación
│   │   └── main.jsx         # Punto de entrada
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── middlewares/
│   └── package.json
├── openapi.yaml             # Especificación REST con Swagger
└── .github/
    └── workflows/
        └── deploy-frontend.yml
```

---

## Módulos de la aplicación

- **Dashboard:** indicadores clave del día (stock, ventas, ingresos)
- **Inventario:** CRUD de productos con alerta de stock bajo
- **Ventas:** registro de ventas con carrito y cálculo automático de totales
- **Reportes:** reportes gerenciales (solo administradores y directivos)

---

## Variables de entorno

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (`.env`)
```
PORT=3000
DB_URL=postgresql://user:password@localhost:5432/distribuciones_db
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## Licencia

Proyecto académico — Corporación Universitaria Iberoamericana, 2026.
