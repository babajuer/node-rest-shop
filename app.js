const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(`mongodb+srv://fangfang:${process.env.MONGO_ATLAS_PWD}@fangfangcluster-csj9o.gcp.mongodb.net/node-rest-shop?retryWrites=true`,
{ useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handle CORS to allow other clients to access our API..
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(res.header === 'options') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST,PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})
app.get('/', (req,res) => {
    res.send('111 hellow world');
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next)=> {
    const error = new Error('Not found ! app.js');
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