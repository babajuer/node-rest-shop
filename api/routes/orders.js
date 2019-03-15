const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders')
const Order = require('../models/order');

router.get('/', checkAuth, OrdersController.order_get_all);

router.post('/', checkAuth, OrdersController.order_create_one);

router.get('/:orderId', checkAuth, OrdersController.order_get_details);

router.delete('/:orderId', checkAuth, OrdersController.order_delete_one);

module.exports = router;