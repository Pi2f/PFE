const express = require('express');
const router = express.Router();
const got = require('got');
const jwt = require('jsonwebtoken');
const config = require('./../config.js');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');

const SKIN_CLASSES = {
	0: 'Dangereuse : akiec, Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease)',
	1: 'Dangereuse : bcc, Basal Cell Carcinoma',
	2: 'Benin : bkl, Benign Keratosis',
	3: 'Benin : df, Dermatofibroma',
	4: 'Dangereuse :mel, Melanoma',
	5: 'Benin : nv, Melanocytic Nevi',
	6: 'Benin : vasc, Vascular skin lesion'
};

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
    if (!req.file.id) {
        req.file.id = req.body.id;
    }
    got('/photo', {
            baseUrl: config.photoApiUrl,
            json: true,
            body: req.file,
        }).then(function (response) {
            res.end();
        })
        .catch(handleError);
});

router.post('/predict', function (req, res) {
    if (!req.file.id) {
        req.file.id = req.body.id;
    }
    
    // const can = createImageData(200,200);
    // const ctx = can.getContext('2d');
    // const img = new Image();
    // img.onload = () => ctx.drawImage(img, 0, 0);
    // img.onerror = err => { throw err };
    // img.src = req.file.buffer;
    // const stream = canvas.createPNGStream()
    // var out = fs.createWriteStream("test");
    // out.write(req.file.buffer);
    // stream.pipe(out);
    // console.log(can);
    // predict(can)
    // out.on('finish', () => .then());
    res.end();
});


// async function predict(image) {
//     const model = await tf.loadModel('http://skin.test.woza.work/final_model_kaggle_version1/model.json'); // adresse du model que l'on utilise, en ligne pour le moment, peut être placé côté utilisateur
//     // Pre-process the image
//     let tensor = tf.fromPixels(image)
//         .resizeNearestNeighbor([224, 224])
//         .toFloat();

//     let offset = tf.scalar(127.5);

//     tensor = tensor.sub(offset)
//         .div(offset)
//         .expandDims();
//     // Pass the tensor to the model and call predict on it.
//     // Predict returns a tensor.
//     // data() loads the values of the output tensor and returns
//     // a promise of a typed array when the computation is complete.
//     // Notice the await and async keywords are used together.
//     let predictions = await model.predict(tensor).data();



//     let top5 = Array.from(predictions)
//         .map(function (p, i) { // this is Array.map
//             return {
//                 probability: p,
//                 className: SKIN_CLASSES[i] // we are selecting the value from the obj
//             };
//         }).sort(function (a, b) {
//             return b.probability - a.probability;
//         }).slice(0, 7);

//     top5.forEach(function (p) {
//         console.log(p);
//     });

// }


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