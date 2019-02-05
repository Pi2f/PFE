myApp.controller('appCheckListCtrl', function ($scope, $stateParams, $state,  photoService) {       
    $scope.services = function () {
        photoService.servicePhoto($stateParams.imgBase64, function (response) {            
            $scope.$apply(function(){                
                $scope.items = response;
             });
        });
    }

    $scope.sendMail = function(){
        photoService.mailPhoto($stateParams.imgBase64, function (response) {            
            $state.go('galerie');
        });
    }

    $scope.services();
    
});