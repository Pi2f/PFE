myApp.factory('userService',['$http', '$q', function($http,$q,sessionService){
    var serv = {};

    serv.createUser = function(form){
        return $http.post('/api/register',form)
        .then(handleSuccess,handleError);
    }

    serv.forgot = function(mail) {
        var form = {
            mail : mail
        }
        return $http.post("/api/forgot", form)
        .then(handleSuccess, handleError);
    };

    serv.reset = function (password, token) {            
        var form = {
            password : password
        }
        return $http.post("/api/resetpw/"+token, form)
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


  
