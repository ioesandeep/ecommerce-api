const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const userController = require('../controllers/users');
const couponsController = require('../controllers/coupons');

router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.add);
router.patch('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

router.get('/coupons', couponsController.getCoupons);
router.post('/coupons', couponsController.addCoupon);
router.patch('/coupons', couponsController.updateCoupon);
router.delete('/coupons/:id', couponsController.deleteCoupon);

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.patch('/users/:id', userController.updateUser);
router.patch('/users/:id/password', userController.changePassword());

router.delete('/users/:id', userController.deleteUser);

router.get('/users/addresses', userController.getAddresses);
router.post('/users/addresses', userController.addAddress);
router.patch('/users/addresses/:id', userController.updateAddress);
router.delete('/users/addresses/:id', userController.deleteAddress);

router.get('/users/payments', userController.getPayments);
router.post('/users/payments', userController.addPayments);
router.patch('/users/payments/:id', userController.updatePayments);
router.delete('/users/payments/:id', userController.deletePayments);


module.exports = router;



