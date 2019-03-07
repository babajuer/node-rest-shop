const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product
        .find()
        .select('name price _id')
        .exec()
        .then(docs => {
            console.log(docs);
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        pruce: doc.price,
                        _id: doc._id,
                        request: {
                            tyep: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.post('/',(req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
        price: req.body.price
    })
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: 'POST product save to DB',
                createdProduct: {
                    name: result.name,
                    pruce: result.price,
                    _id: result._id,
                    request: {
                        tyep: 'POST',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product
        .findById(id)
        .exec()
        .then(result => {
          console.log(`GET one product detail from DB:`, result);
          if(result){
          res.status(200).json(result);
          } else {
            console.log(`Not found in DB`);
            res.status(404).json({
                message: "Not found"
            });
          }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.patch('/:productId',(req, res, next) => {
    const id = req.params.productId;
    const updateOpt = {};

    for( const opt of req.body){
        updateOpt[opt.propName] = opt.value;
    }
    Product
        .update({_id: id}, { $set: updateOpt})
        .exec()
        .then(result => {
          console.log(`PATCH updeta one product in DB:`, result);
          res.status(200).json({
              message: 'product updated ',
              productId: id,
              result
            });          
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.delete('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product
        .remove({_id: id})
        .exec()
        .then(result => {
          console.log(`DELETE one product from DB:`, result);
          res.status(200).json({
              message: 'product deleted ',
              productId: id,
              result
            });          
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});


module.exports = router;