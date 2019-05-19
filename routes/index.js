const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.add);

module.exports = router;
