const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const couponsController = require('../controllers/coupons');

router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.add);

router.get('/coupons', couponsController.getCoupons);
router.post('/coupons', couponsController.addCoupon);
router.patch('/coupons', couponsController.updateCoupon);
router.delete('/coupons/:id', couponsController.deleteCoupon);


module.exports = router;
