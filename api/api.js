const express = require('express');
const router = express.Router();
const got = require('got');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');
const config = require('./../config.js');
const fs = require('fs');

router.get('/:token', function(req, res) {
    verifyToken(req.params.token, function (resp) {
        res.status(200).send(JSON.stringify(resp));
    });
});

router.get('/user/:id', function(req, res) {
    got('user/'+req.params.id, { 
        baseUrl: config.userApiUrl, 
        json: true })
    .then(response => res.send(response.body))
    .catch(handleError);
});

router.get('/users/:id', function(req, res) {
    got('user/all/'+req.params.id, { 
        baseUrl: config.userApiUrl, 
        json: true })
    .then(response => res.send(response.body))
    .catch(handleError);
});

router.post('/authenticate', function(req, res){
    got('/user/authenticate', { 
        baseUrl: config.userApiUrl, 
        json: true,
        body: req.body })
    .then(response => {
        createToken(response.body.user, function (response) {
            res.send(response);
        });
    })
    .catch((error) => {        
        res.status(error.statusCode).end();
    });
});

function createToken(user,cb) {
    const payload = {
        user: {
            id: user._userID,
            mail: user.mail,
            role: user.role,
        }
    };

    const token = jwt.sign(payload, config.secret, {
        expiresIn: "1 days"
    });

    const response = {           
        token: token,
        user: payload.user
    }
    return cb(response);
}

router.post('/register', function(req,res) {
    got('/user/register', { 
        baseUrl: config.userApiUrl, 
        json: true,
        body: req.body })
    .then(response => res.send(response.body))
    .catch(handleError);
});

router.post('/user/admin', function(req,res) {
    got('/user/admin', { 
        baseUrl: config.userApiUrl, 
        json: true,
        body: req.body })
    .then(response => res.send(response.body))
    .catch(handleError);
});

router.get('/user/blocked/:id', function(req,res) {
    got('/user/blocked/'+req.params.id, { 
        baseUrl: config.userApiUrl, 
        json: true })
    .then(response => res.send(response.body))
    .catch(handleError);
});

router.post('/user/blocked', function(req,res) {
    got('/user/blocked', { 
        baseUrl: config.userApiUrl, 
        json: true,
        body: req.body })
    .then(response => res.send(response.body))
    .catch(handleError);
});

router.get('/logout/:id', function(req, res){
    console.log("logout");
});

router.post('/forgot', function (req, res) {    
    got('/forgot', {
        baseUrl: config.userApiUrl,
        json: true,
        body: req.body
    }).then(function(response) { 
        res.send(response.body);
    })
    .catch(handleError);
});

router.post('/resetpw/:token',function(req, res) {
    got('/reset/'+req.params.token, {
        baseUrl: config.userApiUrl,
        json: true,
        body: req.body
    }).then(function(response) { 
        res.send(response.body);
    })
    .catch(handleError);
});

router.post('/photo',function(req,res){
    const form = new FormData();
    form.append('file', fs.createReadStream(__dirname+'/../uploads/'+req.file.filename));
    console.log(form);
    got('/api/photo', {
        baseUrl: config.photoApiUrl,
        body: form
    }).then(function(response) { 
        res.send(response.body);
    })
    .catch(handleError);
});

function verifyToken(token, cb){
    if(token){
        jwt.verify(token, config.secret, function(err, out){
            if(err){                    
                cb(err);
            } else {                    
                cb(out);
            }
        });
    } else cb("Invalid Token");
}

function handleError(error){
    console.log('error:', error);
}

module.exports = {
    router: router,
}