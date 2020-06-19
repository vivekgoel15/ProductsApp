var express = require('express');
var router = express.Router();
const { createProductValidator } = require('../validator');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/product');

// a simple test url to check that all of our files are communicating correctly.
router.get('/products/test', product_controller.test);

router.post('/products/create', createProductValidator, product_controller.product_create);

router.get('/products/:id', product_controller.product_details);

router.get('/products', product_controller.products);

router.put('/products/:id/update', createProductValidator, product_controller.product_update);

router.delete('/products/:id/delete', product_controller.product_delete);

module.exports = router;