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
        type: String,
    },
    img: 
      { data: Buffer, contentType: String }
});

const photoModel = mongoose.model('Photos', photoSchema);

module.exports = {
    addPhoto: function (data){
        const newPhoto = new photoModel();
        newPhoto.img.data = fs.readFileSync(data.path)
        newPhoto.img.contentType = 'image/png';
        newPhoto.userID = data.id;
        newPhoto.save(function(err){
            if(err) console.log(err);
            else console.log("Image saved to mongo");
        });
    },

    getPhoto: function(id){
        photoModel.find({userID: id},function(err, photo){
            if(err) console.log(err);
            else cb(photo);
        })
    }
}