myApp.controller('galerieCtrl', function($scope, $rootScope, $stateParams, $state, $location) {

    $scope.pictureList = [];

    $scope.currentPage = 0;

    $scope.pageSize = 9;

    $scope.pictures = false;

    $scope.numberOfPages=function(){
        return Math.ceil($scope.pictureList.length/$scope.pageSize);                
    }

    $scope.getPicturesList = function (){
        for(var i=1; i<20; i++){
            $scope.pictureList.push({link: '../../images/photo_' + i + '.jpg'});
        }
        if($scope.pictureList.length!=0){
            $scope.pictures = true;
        }
    };
 
    $scope.getPicturesList();

})

myApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});