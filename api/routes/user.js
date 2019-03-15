const express = require('express');
const router = express.Router();
const monggose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: 'already have this email'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else{
                    const user = new User({
                        _id: monggose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    
                    user
                    .save()
                    .then( result => {
                        console.log(`POST: add user`, result);
                        res.status(201).json({
                            message: 'User stored',
                            createdUser: {
                                _id: result._id,
                                email: result.email,
                                pasword: result.pasword
                            }
                        });
                    })
                    .catch( err => {
                        console.log(err);
                        res.status(500).json({error: err})
                    });
                }
            })
        }
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });    
})


router.post('/login', (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed000'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed 111'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed 222'
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

router.delete('/:userId', (req, res, next) => {
    console.log( ` 111111:`, req.params);
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: ` delete user ok`
        });
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
})

module.exports = router;