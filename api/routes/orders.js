const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {    
    res.status(200).json({
        message: 'get orders request'
    })
});

router.post('/',(req, res, next) => {   
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    } 
    res.status(201).json({
        message: 'post orders request',
        order
    })
});

router.get('/:orderId',(req, res, next) => {    
    res.status(200).json({
        message: 'orders details ',
        orderId: req.params.orderId
    })
});

router.delete('/:orderId',(req, res, next) => {    
    res.status(200).json({
        message: 'orders deleted ',
        orderId: req.params.orderId
    })
});

module.exports = router;