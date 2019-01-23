myApp.controller('mdpOublieCtrl', function($scope,userService) {
  
        $scope.forgot = function (){
          userService.forgot($scope.email).then(function () {
              toastr.success("Reset password send");
          });
        }

})