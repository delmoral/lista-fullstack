const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product.controller');

router.get('/', productCtrl.getProducts);
router.post('/', productCtrl.createProduct);
router.get('/:id', productCtrl.getProduct);
router.put('/:id', productCtrl.editProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;