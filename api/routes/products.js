const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get products request 111'
    })
});

router.post('/',(req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'post products request 123!',
        createdProduct: product
    })
});

router.get('/:productId',(req, res, next) => {
    res.status(200).json({
        message: 'orders details ',
        productId: req.params.productId
    })
});

router.delete('/:productId',(req, res, next) => {
    res.status(200).json({
        message: 'orders deleted ',
        productId: req.params.productId
    })
});


module.exports = router;