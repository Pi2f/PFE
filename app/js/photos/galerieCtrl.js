myApp.controller('galerieCtrl', function ($scope, photoService) {   

    $scope.currentPage = 0;

    $scope.pageSize = 9;

    $scope.imgSrc = [];

    $scope.numberOfPages = function () {
        return Math.ceil($scope.imgSrc.length / $scope.pageSize);
    }


    $scope.getFiles = function () {
        photoService.GetPhotos().then(function (res) {
            $scope.imgSrc = res;            
        });
    }

    $scope.getFiles();

})

myApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});