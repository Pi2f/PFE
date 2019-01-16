myApp.controller('mdpOublieCtrl', function($scope, $rootScope, $stateParams, $state, $location,userService) {
  
        $scope.forgot = function (){
          userService.forgot($scope.email).then(function () {
              toastr.success("Reset password send");
          });
        }

})