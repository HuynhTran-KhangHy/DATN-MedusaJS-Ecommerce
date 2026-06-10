const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/upload');

// Base path: /api/products

router.post('/', upload.array('images', 5), productController.createProduct);
router.get('/seller', productController.getSellerProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.array('images', 5), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
