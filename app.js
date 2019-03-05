const express = require('express');
const app = express();

// app.use(express.json());

app.get('/', (req,res) => {
    res.send('111 hellow world');
})

const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);
const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes);

app.use((req, res, next)=> {
    res.status(200).json({
        message: '222 no router found hellow world'
    })
});

module.exports = app;