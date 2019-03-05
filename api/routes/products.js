const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get products request'
    })
});

router.post('/',(req, res, next) => {
    res.status(201).json({
        message: 'post products request'
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