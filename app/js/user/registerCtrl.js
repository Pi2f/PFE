myApp.controller('registerCtrl', function($scope, $state,userService) {

    $scope.register= function(){
        var form = {
          username: $scope.name,
          mail: $scope.email,
          password: $scope.pw,
          job: $scope.profession
        }

        if($scope.pw==$scope.pwConfirm){
            userService.createUser(form).then(function(response){
                if(response.data.success){          
                  $state.go('default');
                } else {
                  $scope.info = response.data.err;
                }
              });
        }else{
            toastr.error("le mot de passe et la confirmation ne correspondent pas");
            $scope.pw='';
            $scope.pwConfirm='';
        }

        //réinitialisation des champs
        $scope.name = '';
        $scope.profession = '';
        $scope.email = '';
        $scope.pw = '';
        $scope.pwConfirm = '';
      }

})