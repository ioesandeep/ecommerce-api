const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.add);
router.patch('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

module.exports = router;
