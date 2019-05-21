const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const productController = require('../controllers/products');
const userController = require('../controllers/users');
const couponsController = require('../controllers/coupons');
const orderController = require('../controllers/order');

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

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.patch('/users/:id', userController.updateUser);
router.patch('/users/:id/password', userController.changePassword);

router.post('/users/auth', userController.authenticate);
router.get('/users/token/:token', userController.getByToken);
router.put('/users/:id', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);
router.get('/users/:id', userController.getUser);

router.get('/users/:uid/addresses', userController.getAddresses);
router.post('/users/:uid/addresses', userController.addAddress);
router.patch('/users/:uid/addresses/:id', userController.updateAddress);
router.delete('/users/:uid/addresses/:id', userController.deleteAddress);

router.get('/users/:uid/payments', userController.getPayments);
router.post('/users/:uid/payments', userController.addPayments);
router.patch('/users/:uid/payments/:id', userController.updatePayments);
router.delete('/users/:uid/payments/:id', userController.deletePayments);

router.get('/orders', orderController.getAll);
router.get('/orders/:id', orderController.getOrder);

router.get('/orders/user/:uid', orderController.getUserOrders);
router.get('/orders/user/:uid/:id', orderController.getOrder);

router.post('/orders', orderController.add);

module.exports = router;
