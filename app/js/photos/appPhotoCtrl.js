myApp.controller('appPhotoCtrl', function ($scope, Upload, sessionService) {
    $scope.uploadFiles = function (files, error) {
        angular.forEach(files, function (file) {
          Upload.upload({
            url: '/api/photo',
            method: 'POST',
            data: {file: file}
          }).then(function (response) {
              return response.data;
          });
      });
    };
})