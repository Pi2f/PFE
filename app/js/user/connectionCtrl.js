myApp.controller('connectionCtrl', function($scope, connectionService, $state, sessionService) {
    $scope.login = function(){
        connectionService.login($scope.email, $scope.pw).then(function(data){
            if(data.err){
                toastr.error("connection failed");
            } else {
                $state.go('appPhoto');                
            }
        });

        //réinitialisation des champs
        $scope.email = '';
        $scope.mdp = '';
    };

})