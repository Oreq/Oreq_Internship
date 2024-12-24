const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../../../controllers/productControllers');

const router = express.Router();

router.post('/product/new', createProduct);
router.get('/product',getAllProducts);
router.get('/product/:id',getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id',deleteProduct);

module.exports = router;
