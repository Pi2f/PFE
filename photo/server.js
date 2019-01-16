const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config.js');
const methodOverride = require('method-override');
const helmet = require('helmet');
const photo = require('./photo.js');
const multer = require('multer');

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(multer({ dest: './uploads/' }).any());


app.use(function onError(err, req, res, next) {
  res.status(500).send(err);
});

app.post('/api/photo',function(req,res){
  console.log(req.files);
    // photo.addPhoto(req.files[0]);
});

app.get('/api/photo/:id',function(req,res){
    photo.getPhoto(req.params.id);
});

const server = http.createServer(app).listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`)
});