myApp.controller('mdpReinitCtrl', function($scope, $rootScope, $stateParams, $state, $location,userService) {
  
    $scope.reset = function(){
        if ($scope.pw == vm.pwConfirm) {
          var token = document.location.href.split('token=')[1];
          userService.reset($scope.pw, token).then(function() {          
            $state.go('default');
            toastr.success("Success! Your password has been changed.")
          });
        } else {
          $scope.pw = "";
          $scope.pwConfirm = "";
        }  
      }  

})