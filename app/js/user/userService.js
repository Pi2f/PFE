myApp.factory('userService',['$http', function($http){
    var serv = {};

    serv.createUser = function(form){
        return $http.post('/register',form)
        .then(handleSuccess,handleError);
    }

    serv.forgot = function(mail) {
        var form = {
            mail : mail
        }
        return $http.post("/forgot", form)
        .then(handleSuccess, handleError);
    };

    serv.reset = function (password, token) {            
        var form = {
            password : password
        }
        return $http.post("/resetpw/"+token, form)
        .then(handleSuccess, handleError);
    };

    function handleSuccess(res){
        return res;
    }

    function handleError(error){
        return { success: false, message: error };
    }

    return serv;
}])


  
