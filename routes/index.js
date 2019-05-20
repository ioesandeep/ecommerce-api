const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const productController = require('../controllers/products');
const couponsController = require('../controllers/coupons');

router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.add);
router.patch('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);
router.get('/categories/children/:id', categoryController.childCategories);

router.get('/products', productController.getAll);
router.get('/products/:slug', productController.getProduct);
router.post('/products', productController.add);
router.patch('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

router.get('/coupons', couponsController.getCoupons);
router.post('/coupons', couponsController.addCoupon);
router.patch('/coupons', couponsController.updateCoupon);
router.delete('/coupons/:id', couponsController.deleteCoupon);


module.exports = router;
