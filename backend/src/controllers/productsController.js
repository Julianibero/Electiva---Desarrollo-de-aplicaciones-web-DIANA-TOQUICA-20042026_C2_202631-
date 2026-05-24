// src/controllers/productsController.js
const pool = require('../config/database');

// Datos mock para que el servidor funcione sin BD configurada
let MOCK_PRODUCTS = [
  { id:1,  name:'Arroz Diana x 1 kg',       sku:'ARR-001', category:'Granos',    stock:45, price:4200  },
  { id:2,  name:'Aceite Gourmet x 1 L',      sku:'ACE-001', category:'Aceites',   stock:7,  price:18500 },
  { id:3,  name:'Azúcar Manuelita x 1 kg',   sku:'AZU-001', category:'Dulces',    stock:32, price:3800  },
  { id:4,  name:'Harina de trigo x 1 kg',    sku:'HAR-001', category:'Harinas',   stock:3,  price:5100  },
  { id:5,  name:'Leche Alpina x 1 L',        sku:'LEC-001', category:'Lácteos',   stock:24, price:3600  },
  { id:6,  name:'Café Águila Roja x 250 g',  sku:'CAF-001', category:'Bebidas',   stock:18, price:12900 },
  { id:7,  name:'Jabón Protex x 120 g',      sku:'JAB-001', category:'Aseo',      stock:60, price:3200  },
  { id:8,  name:'Detergente Ariel x 2 kg',   sku:'DET-001', category:'Aseo',      stock:5,  price:22000 },
  { id:9,  name:'Pasta Doria x 500 g',       sku:'PAS-001', category:'Pastas',    stock:38, price:3100  },
  { id:10, name:'Atún Van Camps x 170 g',    sku:'ATU-001', category:'Conservas', stock:22, price:5800  },
];
let nextId = 11;

async function getAll(req, res, next) {
  try {
    const { search, category, lowStock } = req.query;
    let products = [...MOCK_PRODUCTS];

    if (search)    products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
    if (category)  products = products.filter(p => p.category === category);
    if (lowStock === 'true') products = products.filter(p => p.stock < 10);

    res.json(products);
  } catch (err) { next(err); }
}

async function getOne(req, res, next) {
  try {
    const product = MOCK_PRODUCTS.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.', code: 'NOT_FOUND' });
    res.json(product);
  } catch (err) { next(err); }
}

async function create(req, res, next) {
  try {
    const { name, sku, category, stock, price } = req.body;
    if (!name || !sku || !category || stock === undefined || price === undefined) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.', code: 'VALIDATION_ERROR' });
    }
    if (MOCK_PRODUCTS.find(p => p.sku === sku)) {
      return res.status(409).json({ message: 'Ya existe un producto con ese SKU.', code: 'DUPLICATE_SKU' });
    }
    const newProduct = { id: nextId++, name, sku, category, stock: parseInt(stock), price: parseFloat(price) };
    MOCK_PRODUCTS.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) { next(err); }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Producto no encontrado.', code: 'NOT_FOUND' });

    const { name, sku, category, stock, price } = req.body;
    MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], name: name || MOCK_PRODUCTS[idx].name, sku: sku || MOCK_PRODUCTS[idx].sku, category: category || MOCK_PRODUCTS[idx].category, stock: stock !== undefined ? parseInt(stock) : MOCK_PRODUCTS[idx].stock, price: price !== undefined ? parseFloat(price) : MOCK_PRODUCTS[idx].price };
    res.json(MOCK_PRODUCTS[idx]);
  } catch (err) { next(err); }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Producto no encontrado.', code: 'NOT_FOUND' });
    MOCK_PRODUCTS.splice(idx, 1);
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { getAll, getOne, create, update, remove };
