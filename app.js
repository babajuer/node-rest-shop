const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req,res) => {
    res.send('111 hellow world');
})

const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);
const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes);

app.use((req, res, next)=> {
    const error = new Error('Not found !');
    error.status = 404;
    next(error);
    // res.status(200).json({
    //     message: '222 no router found hellow world'
    // })
});

app.use((error, req, res, next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;