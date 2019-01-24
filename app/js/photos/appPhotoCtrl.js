myApp.controller('appPhotoCtrl', function ($scope, photoService, $state, $timeout) {
    var _video = null;

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
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);
            $scope.$broadcast('STOP_WEBCAM');
        }
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    $scope.send = function(){
        var patCanvas = document.querySelector('#snapshot');
        photoService.sendSnapshotToServer(patCanvas.toDataURL(), function(){
            $('#myModal').modal('hide');
            toastr["success"]("Photo added !!");
            $state.go('galerie');
        });
    }

    $scope.cancel = function(){
        $scope.$broadcast('START_WEBCAM');
    }

    $scope.upload = function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            photoService.UploadPhoto(file).then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                  });
                // toastr["success"]("Photo added !!");
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
    };
})