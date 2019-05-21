const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const productController = require('../controllers/products');
const userController = require('../controllers/users');
const couponsController = require('../controllers/coupons');
const orderController = require('../controllers/order');
const middlewares = require('../middlewares');

router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.add);
router.patch('/categories/:id', middlewares.admin, categoryController.update);
router.delete('/categories/:id', middlewares.admin, categoryController.delete);
router.get('/categories/children/:id', categoryController.childCategories);

router.get('/products', productController.getAll);
router.get('/products/:slug', productController.getProduct);
router.post('/products', middlewares.admin, productController.add);
router.patch('/products/:id', middlewares.admin, productController.update);
router.delete('/products/:id', middlewares.admin, productController.delete);

router.get('/category/products/:slug', categoryController.getCategory);


router.get('/coupons', couponsController.getCoupons);
router.post('/coupons', middlewares.admin, couponsController.addCoupon);
router.patch('/coupons', middlewares.admin, couponsController.updateCoupon);
router.delete('/coupons/:id', middlewares.admin, couponsController.deleteCoupon);

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.patch('/users/:id', middlewares.auth, userController.updateUser);
router.patch('/users/:id/password', middlewares.auth, userController.changePassword);

router.post('/users/auth', userController.authenticate);
router.get('/users/token/:token', middlewares.auth, userController.getByToken);
router.put('/users/:id', middlewares.auth, userController.updateUser);

router.delete('/users/:id', middlewares.admin, userController.deleteUser);
router.get('/users/:id', userController.getUser);

router.get('/users/:uid/addresses', middlewares.auth, userController.getAddresses);
router.post('/users/:uid/addresses', middlewares.auth, userController.addAddress);
router.patch('/users/:uid/addresses/:id', middlewares.auth, userController.updateAddress);
router.delete('/users/:uid/addresses/:id', middlewares.auth, userController.deleteAddress);

router.get('/users/:uid/payments', middlewares.auth, userController.getPayments);
router.post('/users/:uid/payments', middlewares.auth, userController.addPayments);
router.patch('/users/:uid/payments/:id', middlewares.auth, userController.updatePayments);
router.delete('/users/:uid/payments/:id', middlewares.auth, userController.deletePayments);

router.get('/orders', middlewares.admin, orderController.getAll);
router.get('/orders/:id', orderController.getOrder);

router.get('/orders/user/:uid', middlewares.auth, orderController.getUserOrders);
router.get('/orders/user/:uid/:id', middlewares.auth, orderController.getOrder);

router.post('/orders', middlewares.auth, orderController.add);

module.exports = router;
