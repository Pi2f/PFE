const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config.js');
const api = require('./api/api.js');
const methodOverride = require('method-override');
const helmet = require('helmet');
const multer = require('multer');
const got = require('got');
const jwt = require('jsonwebtoken');
const photo = require('./photo/server.js');
const user = require('./user/server.js');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

const options = {
  key: fs.readFileSync(__dirname+'/server.key'),
  cert : fs.readFileSync(__dirname+'/server.cert'),
}

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static(__dirname));
app.use(express.static(__dirname+'/app'));
app.use(express.static(path.resolve('node_modules')));
app.use('/api/photo',upload.single('file'));
app.use('/api/service',upload.single('file'));  
app.use('/api/photo/mail',upload.single('file'));  

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); //ici être plus restrictif, genre le lien de l'app mobile
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


app.get('/', (req, res) => res.sendFile(__dirname+'/app/index.html'));

app.post('/authenticate', function(req, res){
  got('/user/authenticate', { 
      baseUrl: config.userApiUrl, 
      json: true,
      body: req.body })
  .then(response => {
      //console.log(response.body);
      if(response.body.user){
          createToken(response.body.user, function (response) {
              res.send(response);
          });
      } else {
          res.send(response.body);
      }
  })
  .catch(handleError);
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

app.post('/register', function(req,res) {
  got('/user/register', { 
      baseUrl: config.userApiUrl, 
      json: true,
      body: req.body })
  .then(response => res.send(response.body))
  .catch(handleError);
});



app.post('/forgot', function (req, res) {    
  got('/forgot', {
      baseUrl: config.userApiUrl,
      json: true,
      body: req.body
  }).then(function(response) { 
      res.send(response.body);
  })
  .catch(handleError);
});

app.post('/resetpw/:token',function(req, res) {
  got('/reset/'+req.params.token, {
      baseUrl: config.userApiUrl,
      json: true,
      body: req.body
  }).then(function(response) { 
      res.send(response.body);
  })
  .catch(handleError);
});

function handleError(error) {
    console.log('error:', error);
}

app.use('/api', api.router);

const server = https.createServer(options,app).listen(process.env.PORT || config.port, function(){ 
// const server = http.createServer(app).listen(process.env.PORT || config.port, function(){ 
  console.log(`Example app listening on port ${config.port}!`)
});
