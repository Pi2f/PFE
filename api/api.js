const express = require('express');
const router = express.Router();
const got = require('got');
const jwt = require('jsonwebtoken');
const config = require('./../config.js');

router.use(function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.secret, function (err, out) {
            if (err) {
                res.status(200).send(JSON.stringify(err));
            } else {
                req.user = out.user;
            }
        });
    } else {
        res.status(200).send(JSON.stringify({
            err: "InvalidToken"
        }));
    }
    next();
});

router.get('/session', function (req, res) {
    res.status(200).send(JSON.stringify({
        user: req.user
    }));
});


router.get('/logout/:id', function (req, res) {
    console.log("logout");
});

router.post('/photo', function (req, res) {
    if(!req.file.id){
        req.file.id = req.body.id;
    }
     
    got('/photo', {
            baseUrl: config.photoApiUrl,
            json: true,
            body: req.file,
        }).then(function (response) {
            res.send(response.body);
        })
        .catch(handleError);
    });
    
    router.get('/photo/:id', function (req, res) {
        got('/photo/' + req.params.id, {
            baseUrl: config.photoApiUrl,
            json: true,
        }).then(function (response) {            
            res.send(response.body);
        })
        .catch(handleError);
});

function handleError(error) {
    console.log('error:', error);
}

module.exports = {
    router: router,
}