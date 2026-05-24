# Distribuciones Comerciales del Centro S.A.S. — App Web

Aplicación web de gestión de inventarios y ventas desarrollada como entrega de la **Actividad 4 — Electiva Desarrollo de Aplicaciones Web**.

**Autor:** Julian Vega Joya  
**Institución:** Corporación Universitaria Iberoamericana  
**Docente:** Diana Toquica  
**Fecha:** Mayo de 2026  

---

## Descripción del proyecto

Sistema web de segunda generación (Web II) que centraliza los procesos de inventario y ventas de Distribuciones Comerciales del Centro S.A.S., empresa del sector de consumo masivo en Bogotá. La aplicación reemplaza el manejo manual en hojas de cálculo por una plataforma accesible desde cualquier dispositivo, con control de acceso por roles, reportes en tiempo real y trazabilidad completa de movimientos.

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React.js + Vite | 18.x / 5.x |
| Routing | React Router | v6 |
| Estado global | Context API + useReducer | — |
| HTTP | Axios | 1.x |
| Backend | Node.js + Express.js | 20.x LTS / 4.x |
| Base de datos | PostgreSQL | 16.x |
| Autenticación | JSON Web Tokens (JWT) | RFC 7519 |
| Documentación API | Swagger / OpenAPI | 3.0.3 |
| Despliegue | AWS (S3 + CloudFront + EC2 + RDS) | — |
| CI/CD | GitHub Actions | — |

---

## Estructura del repositorio

```
distribuciones-comerciales-app/
│
├── frontend/                        # React 18 + Vite
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js     # Axios centralizado con interceptores JWT
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Context API — estado global de autenticación
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── inventoryService.js  # Peticiones HTTP con Axios
│   │   │   └── salesService.js
│   │   ├── components/
│   │   │   ├── inventory/
│   │   │   │   └── ProductCard.jsx  # Componente reutilizable React
│   │   │   ├── sales/
│   │   │   │   └── SaleForm.jsx     # useState + useEffect + useContext + useReducer
│   │   │   └── shared/
│   │   │       └── Layout.jsx       # Sidebar y estructura principal
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── InventoryPage.jsx
│   │   │   ├── SalesPage.jsx
│   │   │   └── ReportsPage.jsx      # Solo accesible por admin y director
│   │   ├── App.jsx                  # React Router v6 — rutas protegidas por rol
│   │   └── main.jsx                 # Punto de entrada
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                         # Node.js + Express.js
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # Pool de conexión a PostgreSQL
│   │   │   └── swagger.js           # Configuración OpenAPI 3.0 con Swagger
│   │   ├── middlewares/
│   │   │   ├── auth.js              # Verificación JWT + autorización por rol
│   │   │   └── errorHandler.js      # Manejo global de errores
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productsController.js
│   │   │   ├── salesController.js
│   │   │   └── dashboardController.js
│   │   ├── routes/
│   │   │   ├── auth.js              # POST /api/auth/login
│   │   │   ├── products.js          # CRUD /api/products
│   │   │   ├── sales.js             # CRUD /api/sales
│   │   │   └── dashboard.js         # GET /api/dashboard/stats
│   │   └── server.js                # Punto de entrada del servidor
│   ├── database/
│   │   └── schema.sql               # Esquema PostgreSQL normalizado en 3FN
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy-frontend.yml      # Pipeline CI/CD — GitHub Actions → AWS S3
│
├── distribuciones-comerciales-app.html  # Demo standalone (sin servidor)
└── README.md
```

---

## Instalación y ejecución local

### Prerequisitos
- Node.js 20.x LTS
- npm 10.x
- PostgreSQL 16.x (opcional — el backend funciona con datos mock sin BD)

### 1. Clonar el repositorio

```bash
git clone https://github.com/julianvegajoya/distribuciones-comerciales-app.git
cd distribuciones-comerciales-app
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env        # Editar con tus credenciales de BD
npm run dev                  # Servidor en http://localhost:3000
```

Swagger UI disponible en: **http://localhost:3000/api-docs**

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env        # Configurar VITE_API_URL=http://localhost:3000/api
npm run dev                  # App en http://localhost:5173
```

### 4. Base de datos (opcional)

```bash
psql -U postgres
\i backend/database/schema.sql
```

### 5. Demo sin instalación

Abre directamente el archivo `distribuciones-comerciales-app.html` en cualquier navegador. No requiere servidor ni instalación.

---

## Credenciales de prueba

| Usuario | Correo | Contraseña | Rol |
|---------|--------|-----------|-----|
| Julian Vega Joya | admin@distribuciones.co | password | admin |
| María López | ventas@distribuciones.co | password | vendedor |
| Carlos Ruiz | bodega@distribuciones.co | password | bodega |

---

## Endpoints principales de la API

| Método | Ruta | Descripción | Roles |
|--------|------|-------------|-------|
| POST | `/api/auth/login` | Iniciar sesión | Público |
| GET | `/api/products` | Listar inventario | Todos |
| POST | `/api/products` | Crear producto | admin, bodega |
| PUT | `/api/products/:id` | Actualizar producto | admin, bodega |
| DELETE | `/api/products/:id` | Eliminar producto | admin |
| GET | `/api/sales` | Listar ventas | Todos |
| POST | `/api/sales` | Registrar venta | Todos |
| GET | `/api/dashboard/stats` | Indicadores del día | Todos |
| GET | `/api/reports/summary` | Reporte gerencial | admin, director |

Documentación completa e interactiva: `http://localhost:3000/api-docs`

---

## Despliegue en producción (AWS)

```
Frontend → S3 + CloudFront (CDN)
Backend  → EC2 (Node.js + PM2 + HTTPS)
BD       → RDS PostgreSQL (respaldos automáticos diarios)
CI/CD    → GitHub Actions (push a main → deploy automático)
```

El workflow `.github/workflows/deploy-frontend.yml` automatiza:
1. Instalación de dependencias
2. Compilación con Vite (`npm run build`)
3. Sincronización del `dist/` con S3
4. Invalidación de caché en CloudFront

---

## Referencias

- Abramov, D., y Clark, A. (2019). *Introducing Hooks*. https://legacy.reactjs.org/docs/hooks-intro.html
- Axios. (2024). *Getting started*. https://axios-http.com/docs/intro
- Fielding, R. T. (2000). *Architectural styles and the design of network-based software architectures* [Tesis doctoral, UCI].
- Martínez Martínez, A. (2021). *Proyecto feedback backend y frontend web* [Trabajo de grado, Universitat Jaume I].
- Meta. (2024). *React: The library for web and native user interfaces*. https://react.dev
- Pérez Ibarra, S. G., et al. (2021). Herramientas y tecnologías para el desarrollo web. *XXIII WICC*, Chilecito.
- Remix Software. (2024). *React Router v6*. https://reactrouter.com/en/main
- SmartBear Software. (2024). *OpenAPI Specification 3.0*. https://swagger.io/specification/

---

## Licencia

Proyecto académico — Corporación Universitaria Iberoamericana, 2026.
