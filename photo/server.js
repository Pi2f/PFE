const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config.js');
const methodOverride = require('method-override');
const helmet = require('helmet');
const photo = require('./photo.js');
const mail = require('./mail.js');

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static(__dirname));


app.use(function onError(err, req, res, next) {
  res.status(500).send(err);
});

app.post('/photo', function(req,res){
    photo.addPhoto(req.body, function () {
      res.status(200).end();
    });
});

app.get('/photo/:id',function(req,res){
    photo.getPhoto(req.params.id, function(err, photos){
      res.status(200).send(photos);
    });
});

app.post('/photo/mail', function (req, res) {
  mail.sendMail(config.doctorMail, req.body.buffer, function(){
    res.status(200).end();
  });
});

const server = http.createServer(app).listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`)
});