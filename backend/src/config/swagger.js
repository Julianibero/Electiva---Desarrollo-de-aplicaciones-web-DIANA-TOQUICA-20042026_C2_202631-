// src/config/swagger.js
// Configuración de Swagger / OpenAPI 3.0 para documentar la API REST
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API Distribuciones Comerciales del Centro S.A.S.',
      version: '1.0.0',
      description:
        'API REST para la gestión de inventarios y ventas. ' +
        'Desarrollada con Node.js + Express.js como parte de la Actividad 4 — ' +
        'Electiva Desarrollo de Aplicaciones Web, Corporación Universitaria Iberoamericana.',
      contact: {
        name: 'Julian Vega Joya',
        email: 'julian.vega@distribuciones.co',
      },
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'Servidor de desarrollo' },
      { url: 'https://api.distribuciones.com/api', description: 'Servidor de producción (AWS EC2)' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtenido desde el endpoint POST /auth/login',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id:       { type: 'integer', example: 1 },
            name:     { type: 'string',  example: 'Arroz Diana x 1 kg' },
            sku:      { type: 'string',  example: 'ARR-001' },
            category: { type: 'string',  example: 'Granos' },
            stock:    { type: 'integer', example: 45 },
            price:    { type: 'number',  format: 'float', example: 4200 },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'sku', 'category', 'stock', 'price'],
          properties: {
            name:     { type: 'string',  example: 'Arroz Diana x 1 kg' },
            sku:      { type: 'string',  example: 'ARR-001' },
            category: { type: 'string',  example: 'Granos' },
            stock:    { type: 'integer', example: 45 },
            price:    { type: 'number',  format: 'float', example: 4200 },
          },
        },
        Sale: {
          type: 'object',
          properties: {
            id:         { type: 'integer' },
            seller_id:  { type: 'integer' },
            seller_name:{ type: 'string' },
            total:      { type: 'number', format: 'float' },
            status:     { type: 'string', enum: ['completada', 'anulada'] },
            created_at: { type: 'string', format: 'date-time' },
            items:      { type: 'array', items: { $ref: '#/components/schemas/SaleItem' } },
          },
        },
        SaleItem: {
          type: 'object',
          properties: {
            product_id: { type: 'integer' },
            product_name: { type: 'string' },
            qty:        { type: 'integer' },
            unit_price: { type: 'number', format: 'float' },
            subtotal:   { type: 'number', format: 'float' },
          },
        },
        SaleInput: {
          type: 'object',
          required: ['items'],
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['product_id', 'qty'],
                properties: {
                  product_id: { type: 'integer', example: 1 },
                  qty:        { type: 'integer', example: 3 },
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id:    { type: 'integer' },
            name:  { type: 'string' },
            email: { type: 'string', format: 'email' },
            role:  { type: 'string', enum: ['admin', 'vendedor', 'bodega', 'director'] },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'admin@distribuciones.co' },
            password: { type: 'string', example: 'admin123' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT de sesión (expira en 8h)' },
            user:  { $ref: '#/components/schemas/User' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            code:    { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
