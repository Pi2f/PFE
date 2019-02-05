myApp.controller('appPhotoCtrl', function ($scope, photoService, $state, Upload) {
    var _video = null;
    $scope.$broadcast('START_WEBCAM');

    $scope.patOpts = {
        x: 0,
        y: 0,
        w: 25,
        h: 25
    };

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.channel = {};

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function () {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function () {
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function () {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
        });
    };

    $scope.onStream = function (stream) {
        // You could do something manually with the stream.
    };

    $scope.makeSnapshot = function () {
        if (_video) {
            var img = document.querySelector('#snapshot');
            var dataUrl = getVideoDataURL($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            img.src = dataUrl;
            
            $scope.$broadcast('STOP_WEBCAM');
        }
    };

    var getVideoDataURL = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return hiddenCanvas.toDataURL();

    };

    $scope.send = function () {
        var img = document.querySelector('#snapshot');
        photoService.storePhoto(img.src, function () {
            $('#myModal').modal('hide');
            toastr["success"]("Photo added !!");            
            $state.go('appCheckList', { imgBase64: img.src });
        });
    }

    $scope.cancel = function () {
        $scope.$broadcast('START_WEBCAM');
    }

    $scope.upload = function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            photoService.UploadPhoto(file).then(function (response) {
                file.result = response.data;
                toastr["success"]("Photo added !!");
                Upload.base64DataUrl(file).then(function(url){
                    $state.go('appCheckList', { imgBase64: url });
                });
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {            
                $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);                 
            });
        }
    };
})