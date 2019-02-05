const mongoose = require('mongoose');
const config = require('./config.js');
const fs = require('fs');

mongoose.connect(config.urlDB,{
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
}, function(err) {
    if (err) { throw err; } else {
        console.log('Mongo: Database connected');
    }
});


const photoSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    fieldname: {
        type: String,
    },
    originalname: {
        type: String,
    },
    img: 
      { data: Buffer, contentType: String }
});

const photoModel = mongoose.model('Photos', photoSchema);

module.exports = {
    addPhoto: function (data, cb){
        const newPhoto = new photoModel();
        newPhoto.userID = data.id;
        newPhoto.img.data = data.buffer.data;
        newPhoto.img.contentType = 'image/png';
        newPhoto.fieldname = data.fieldname;
        newPhoto.originalname = data.originalname;
        newPhoto.save(function(err){
            if(err) console.log(err);
            else {
                console.log("Image saved to mongo");
                cb();
            } 
        });
    },

    getPhoto: function(id, cb){
        photoModel.find({userID: id},function(err, photo){
            if(err) console.log(err);
            else cb(null,photo);
        })
    },
    
    deletePhoto: function(data,cb){
        photoModel.remove({
            ObjectId: data.photoId
        }, function(err){
            if(err){ 
                console.log(err);
            }
        })
    }
}