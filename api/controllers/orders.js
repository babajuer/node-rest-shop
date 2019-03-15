const Order = require('../models/order');
const Product = require('../models/product');
const monggose = require('mongoose');

exports.order_get_all = (req, res, next) => {
    Order
        .find()
        .select('_id quantity product')
        .populate('product', ' name price')
        .exec()
        .then(result => {
            console.log(`Get: orders:`, result);
            res.status(200).json({
                count: result.length,
                orders: result.map(item => {
                    return {
                        _id: item._id,
                        quantity: item.quantity,
                        product: item.product,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + item._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.order_create_one = (req, res, next) => {
    // check if the productId existed in product collection
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }
            const order = new Order({
                _id: monggose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(`POST: add order`);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.order_get_details = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            console.log('orders details ' + result);
            res.status(200).json({
                message: 'orders details ',
                order: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/'

                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.order_delete_one = (req, res, next) => {
    // check if orderId is existed
    Order.findById(req.params.orderId)
        .exec()
        .then(order => {
            return Order.deleteOne({
                _id: req.params.orderId
            });
        })
        .then(result => {
            res.status(200).json({
                message: 'orders deleted ',
                orderId: req.params.orderId,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders/',
                    body: {
                        productId: 'ID',
                        quantity: ''
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

}